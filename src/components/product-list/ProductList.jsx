
import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import Pagination from "../pagination/Pagination";
const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductList() {
    // generar un estado para nuestros productos []
    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [limitProduct, setLimitProduct] = useState(5)

    async function getProducts(page = 0) {
            try {
                const response = await axios.get(`${URL}/products?page=${page}`);
                setProducts(response.data.products);
                setTotalItems(response.data.total);
                setLimitProduct(response.data.limitProduct)
            } catch (error) {
                console.log(error)
            }
        }
    useEffect(() => {
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
            <Pagination totalItems={totalItems} loadPage={getProducts} limitProduct={limitProduct} />
        </div>
    )
}