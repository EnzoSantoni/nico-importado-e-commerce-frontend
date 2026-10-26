import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useOrder } from "../../context/OrderContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductDetail() {
    const [ product, setProduct ] = useState()
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams();
    const {addOrderItem} = useOrder()

    async function getProductById(id) {
        try {
            const response = await axios.get(`${URL}/products/${id}`);
            console.log(response)
            setProduct(response.data.product);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        getProductById(id);
    }, [id])

    if(loading) {
        return(
            <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
                <Link to={'/'} className="self-start text-sm text-text-muted hover:text-text transition-colors">Volver</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start animate-pulse">
                    <div className="bg-surface-hover aspect-4/5 rounded-lg"></div>
                    <div className="flex flex-col gap-4">
                        <div className="h-3 w-24 bg-surface-hover rounded-md"></div>
                        <div className="h-9 w-3/4 bg-surface-hover rounded-md"></div>
                        <div className="h-8 w-32 bg-surface-hover rounded-md"></div>
                        <div className="h-12 w-full bg-surface-hover rounded-md"></div>
                        <div className="border-t border-borders pt-4 flex flex-col gap-2">
                            <div className="h-4 w-full bg-surface-hover rounded-md"></div>
                            <div className="h-4 w-5/6  bg-surface-hover rounded-md"></div>
                            <div className="h-4 w-2/3 bg-surface-hover rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 

    if(!product) {
        return(
            <div className="w-full max-w-6xl flex-1 mx-auto flex flex-col gap-6 justify-center items-center px-4 text-center">
                <h1 className="font-headingtext-3xl md:text-4xl text-text">No se pudo encontrar el producto</h1>
                <p className="text-sm text-text-muted">Puede que lo hayan dado de baja o que el link no sea correcto.</p>
                <Link to={'/'} className="px-5 py-2.5 rounded-md border border-accent bg-accent text-sm font-medium text-text-on-accent hover:bg-accent-hover hover:border-accent-hover transition-colors duration-200">Ver catálogo</Link>
            </div>
        )
    }

    return (
        <>
            <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
                <Link to={'/'} className="self-start text-sm text-text-muted hover:text-text transition-colors">Volver</Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div className="aspect-4/5 overflow-hidden rounded-lg border border-borders bg-surface">
                        <img className="w-full h-full object-cover" src={`http://localhost:3000/images/prodcuts/${product.image}`} alt={product.name} />
                    </div>
                    <div className="flex flex-col gap-4 md:sticky md:top-8">
                        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">{product.category?.name}</span>
                        <h1 className="font-heading text-3xl md:text-4xl text-text">{product.name}</h1>
                        <p className="text-3xl font-medium text-accent tabular-nums">{Number(product.price).toLocaleString('es-AR', {style: 'currency', currency: 'ARS'})}</p>
                        <button className="w-full py-3 rounded-md border border-accent bg-accent text-base font-medium text-text-on-accent hover:bg-accent-hover hover:border-accent-hover cursor-pointer transition-colors duration-200" onClick={() => addOrderItem(product)}>Añadir al carrito</button>
                        <div className="border-t border-borders pt-4 flex flex-col gap-2">
                            <h2 className="text-sm font-medium text-text">Descripción</h2>
                            <p className="text-base leading-normal text-text-muted">{product.description}</p>
                        </div>
                        <span className="text-xs text-text-muted tabular-nums">Publicado el {new Date(product.createdAt).toLocaleDateString('es-AR')} </span>
                    </div>
                </div>
            </div>
        </>
    )
}