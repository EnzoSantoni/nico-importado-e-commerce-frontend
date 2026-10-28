
import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import Pagination from "../pagination/Pagination";
import Swal from "sweetalert2";
const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductList() {
    // generar un estado para nuestros productos []
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [limitProduct, setLimitProduct] = useState(5);
    //Guardar la categoria que el usuario eligio
    const [category, setCategory] = useState('')
    // Guardar las categorias del backend
    const [categories, setCategories] = useState([])

    async function getProducts({page = 0, category}) {
            try {
                const categoryQuery = category ? `&category=${category}` : '';

                const response = await axios.get(`${URL}/products?page=${page}&limit=${limitProduct}${categoryQuery}`);
                setProducts(response.data.products);
                setTotalItems(response.data.total);
                setLimitProduct(response.data.limitProduct)
            } catch (error) {
                console.log(error)
            }
        }

    async function getCategories() {
        try {
            const response = await axios.get(`${URL}/categories`)
            const {categories} = response.data;
            setCategories(categories)
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "No se pudieron obtener categorias", "error")
        }
    }

    useEffect(() => {
        getProducts({})
    }, [limitProduct])

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="flex flex-1 flex-col gap-8 pb-12">
            <h2>LISTA DE PRODUCTOS</h2>
            <div>
                <select onChange={(e) => getProducts({category: e.target.value})}>
                    <option value=''>Sin filtro</option>
                    {categories.map(c => {
                        if(!categories) return 
                        return <option value={`${c._id}`} key={c._id}>{c.viewValue}</option>
                    })}
                </select>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3">
                {
                    products.map(prod => (
                        <ProductCard key={prod._id} prod={prod}/>
                    ))
                }
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
                <Pagination totalItems={totalItems} loadPage={getProducts} limitProduct={limitProduct} key={limitProduct} movement={true} />
            </div>
        </div>
    )
}