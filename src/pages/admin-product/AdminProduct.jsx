import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import ProductForm from "../../components/ProductForm/ProductForm";
import { formatTimestampToInputDate } from "../../service/utils/formateDates";
import { useUser } from "../../context/UserContext";
import useApi from "../../service/interceptor/Interceptor";
import Pagination from "../../components/pagination/Pagination";


const thStyles = 'px-4 py-3 text-xs font-medium uppercase tracking-wide text-text-muted';
const tdStyle = 'px-4 py-3 align-middle text-text';
const URL = import.meta.env.VITE_SERVER_URL;
const dialogStyles = 'm-auto w-full max-w-lg rounded-lg border border-borders bg-surface p-0 text-text opacity-0 scale-95 open:opacity-100 open:scale-100 starting:open:opacity-0 starting:open:scale-95 transition-[opacity,scale,display,overlay] transition-discrete duration-200 ease-out backdrop:bg-transparent open:backdrop:bg-bg/70 starting:open:backdrop:bg-transparent backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-200';


export default function AdminProduct() {
    // Estados modal
    const api = useApi()
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [ categories, setCategories] = useState([]);
    const { token } = useUser()
    const dialogRef = useRef(null)
    // ! Estados para mi componente paginacion y peticion
    const [totalItems, setTotalItems] = useState(0);
    const [limitProduct, setLimitProduct] = useState(5);

    async function getProducts ({page = 0}) {
        try {
            const response = await api.get(`/products?limit=${limitProduct}&page=${page}`);
            
            const { products, total } = response.data;

            setTotalItems(total)
            setProducts(products);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts({});
        getCategories();
    }, [limitProduct])

    async function getCategories() {
        try {

            const response = await api.get(`${URL}/categories`, {headers:{Authorization: token}});

            const categoriesDB = response.data.categories

            setCategories(categoriesDB)
        } catch (error) {
            console.log("Error al obtener categorias", error)
        }
    }

    async function updateProduct(data) {
        try {

            await api.put(`/products/${editingProduct._id}`, data)

            // await axios.put(`${URL}/products/${editingProduct._id}`,
            //                                                 data, 
            //                                                 {headers:{Authorization: token}})
            //Cartel de exito para el usuario
            getProducts({});
            dialogRef.current.close();
        } catch (error) {
            console.log(error)
        }
    }

    async function createProduct(product) {
        try {
            const newProduct = await api.post(`/products`, product);
            console.log(newProduct)
            getProducts({})
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteProduct(id) {
        const result = await Swal.fire({
            title: '¿Borrar producto?',
            text: 'Seguro que quiere borrar este producto?',
            showConfirmButton: true,
            confirmButtonText: 'Borrar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            icon: 'warning',
            iconColor: 'var(--color-error)',
            confirmButtonColor: 'var(--color-error)',
            cancelButtonColor: 'var(--color-surface-hover)',
            backdrop: 'color-mix(in srgb, var(--color-bg) 70%, transparent)',
            width: '24rem',
            reverseButtons: true,
            focusCancel: true
        })

        if(result.isConfirmed) {
            try {
                await api.delete(`/products/${id}`);
                getProducts({});
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo borrar el producto. Probá de nuevo',
                    showConfirmButton: true,
                    confirmButtonText: 'Entendido',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    icon: 'error',
                    iconColor: 'var(--color-error)',
                    confirmButtonColor: 'var(--color-surface-hover)',
                    backdrop: 'color-mix(in srgb, var(--color-bg) 70%, transparent)',
                    width: '24rem',
                })
            }
        }
    }

    function handleEditProduct(producto) {

    console.log(producto)
        setEditingProduct(producto)
        dialogRef.current.showModal()
    }

    function handleDialogClose() {
        if(!dialogRef.current.open) {
            setEditingProduct(null);
        }
    }

    function offModal(evt) {
        if(evt.target === evt.currentTarget) {
            dialogRef.current.close();
        }
    }



    return (
        <div className="w-full px-4 py-8 flex flex-col gap-10">
            <h1 className="w-full max-w-5xl mx-auto font-heading text-3xl text-text">Productos</h1>
            <section className="w-full max-w-2xl mx-auto flex flex-col gap-4">
                <h2 className="font-heading text-xl text-text">Nuevo producto</h2>
                <ProductForm  submitLabel="Crear" onSave={createProduct} categories={categories}/>
            </section>
            <section className="w-full max-w-5xl mx-auto flex flex-col gap-4">
                <h2 className="font-heading text-xl text-text">Productos cargados</h2>
                <div className="overflow-x-auto rounded-lg border border-borders bg-surface">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-borders">
                                <th className={thStyles}>Imagen</th>
                                <th className={thStyles}>Producto</th>
                                <th className={thStyles}>Precio</th>
                                <th className={`${thStyles} hidden md:table-cell`}>Descripcion</th>
                                <th className={thStyles}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borders">
                            {products.map(p => {
                                
                                return <tr className="hover:bg-surface-hover transition-colors" key={p._id}>
                                    <td className={tdStyle}><img src={`http://localhost:3000/images/prodcuts/${p.image}`} alt={p.name} className="size-12 rounded-md object-cover bg-surface-hover"/></td>
                                    <td className={`${tdStyle} font-medium`}>{p.name}</td>
                                    <td className={`${tdStyle}  tabular-nums`}>$ {+p.price}</td>
                                    <td className={`${tdStyle}  hidden md:table-cell max-w-xs`}> 
                                        <p className="line-clamp-2 text-text-muted">{p.description}</p> 
                                    </td>
                                    <td className={tdStyle}>
                                        <div className="flex gap-2">
                                            <button className="size-8 flex items-center justify-center rounded-md text-text-muted hover:bg-bg cursor-pointer transition-colors duration-200 hover:text-text" onClick={() => handleEditProduct(p)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            <button className="size-8 flex items-center justify-center rounded-md text-text-muted hover:bg-bg cursor-pointer transition-colors duration-200 hover:text-error" onClick={() => deleteProduct(p._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col items-center gap-4 sm:grid sm:grid-cols-3 px-3">
                    <label className="flex items-center gap-2 text-sm text-text-muted">
                        Mostrar
                        <select className="h-10 px-3 rounded-md border border-borders bg-bg text-sm text-text tabular-nums cursor-pointer outline-none focus:border-accent" onChange={(e) => setLimitProduct(+e.target.value)} value={limitProduct}>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="8">8</option>
                        </select>
                        por página
                    </label>
                    <Pagination totalItems={totalItems} loadPage={getProducts} limitProduct={limitProduct} key={limitProduct} movement={false} />
                </div>
            </section>
            <dialog ref={dialogRef} onTransitionEnd={handleDialogClose} onClick={offModal} className={dialogStyles}
            >   
                <div className={"p-6 flex flex-col gap-6"}>
                    <h2 className="font-heading text-xl text-text">Editar producto</h2>
                    {editingProduct && <ProductForm key={editingProduct._id} onSave={updateProduct} submitLabel="Guardar cambios" onCancel={() => dialogRef.current.close()} defaultValues={{... editingProduct, createdAt: formatTimestampToInputDate(editingProduct.createdAt), category: editingProduct.category._id, image: undefined }} categories={categories} />}
                </div>
            </dialog>
        </div>
    )
}