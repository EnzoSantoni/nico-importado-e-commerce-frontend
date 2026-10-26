
import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductList() {
    // generar un estado para nuestros productos []
    const [products, setProducts] = useState([])
    // UseEffect hacer una peticion controlada
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.get(`${URL}/products`);
                setProducts(response.data.products)
            } catch (error) {
                console.log(error)
            }
        }
        getProducts()
    }, [])

    return (
        <div>
            <h2>LISTA DE PRODUCTOS</h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-3">
                {
                    products.map(prod => (
                        <ProductCard key={prod._id} prod={prod}/>
                    ))
                }
            </div>
        </div>
    )
}