import { createContext, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";
import { useUser } from "./UserContext";
import useApi from "../service/interceptor/Interceptor";

const OrderContext = createContext()


export const useOrder = () => useContext(OrderContext)

export const OrderProvider = ({ children }) => {
    const api = useApi();
    const { user, token } = useUser();
    //estado de la orden
    const [ order, setOrder ] = useState(JSON.parse(localStorage.getItem('order')) || []);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    //calcular total
    const total = order.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0 )
    //calcular cantidad
    const totalQuantity = order.reduce((acc, prod) => acc + prod.quantity, 0);

    //estado de desplegar o no el sidebar
    //estados total

    //function agregar producto
    function addOrderItem(prod) {
        // Buscar en la orden si existe el producto y si existe aniadimos 1 a cantidad
        const product = order.find(producto => producto._id === prod._id);
            
        
        if(product) {
            handleChangeQuantity(product._id, product.quantity + 1);
            
            return
        } else {
            const newOrderProduct = {...prod, quantity: 1}
            
            // Si no existe lo aniadimos al array
            setOrder([...order, newOrderProduct])
        }
    }


    useEffect(() => {
        //Se ejecuta o llaman a las funciones cuando el estado order se actualiza
        localStorage.setItem("order", JSON.stringify(order));
        
    }, [order]);

    //Funcion para manejar los cambios de cantidad
    function handleChangeQuantity(id, quantity) {
        // Buscar el producto por su id
        // Cambiarle la cantidad
        // Actualizar mi estado order
        const quantitySafe = Math.max(1, Math.floor( Number(quantity) || 1))

        const updatedOrder = order.map(item => {
            if(item._id === id) {
                return {...item, quantity: quantitySafe};
            }
        return item
        })
        setOrder(updatedOrder)
    }

    // remover elemento de la carta
    function removeItem(id) {
        Swal.fire({
            title: `Borrar item`,
            text: `Realmente desea borrar el producto?`,
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Borrar',
            reverseButtons: true,
            background: `var(--color-surface)`,
            color: `var(--color-text)`,
            iconColor: `var(--color-error)`,
            confirmButtonColor: `var(--color-error)`,
            cancelButtonColor: `var(--color-surface-hover)`,
            backdrop:'color-mix(in srgb, var(--color-bg) 70%, transparent)',
            width: '24rem'
        }).then(result => {
            if(result.isConfirmed) {
                const updOrder = order.filter(prod => prod._id !== id);
                setOrder(updOrder);
            }
        })
    }

    function resetOrders() {
        setOrder([])
    }

    async function postOrder() {
        try {
            
            //Checkear si el usuario esta logueado
            if(!user || !token) {
                return Swal.fire({
                    title: "Error",
                    text: "Debe estar logueado para realizar una orden",
                    icon: "warning",
                    timer: 4000
                })
            }

            // if(!order || !order.length) {
            //     return Swal.fire("Error", "No se puede crear una orden vacia", "error")
            // }

            const products = order.map(item => {
                return {
                    quantity: item.quantity,
                    product: item._id,
                    price: item.price
                }
            })

            //Armar el objeto order para el backend
            const nuevaOrder = {
                total,
                user: user._id,
                products
            }

            const response = await api.post("/orders", nuevaOrder );


            //Enviarlo
            Swal.fire("Orden creada", response.data.message, "success");

            setOrder([]);


            const getOrders = await api.get(`/orders/${user._id}`);

            console.log(getOrders)

        } catch (error) {
            console.dir(error);
            if(error.response?.status !== 401) {
                Swal.fire("Error", error.response?.data.message ?? "No se pudo crear la orden", "error")
            }
        }
    }

    //toggle
    function toggleSidebarOrder() {
        setSidebarToggle(!sidebarToggle);
    }


    return (
        <OrderContext.Provider value={{order, addOrderItem, total, handleChangeQuantity, removeItem, toggleSidebarOrder, sidebarToggle, totalQuantity, postOrder, resetOrders}}>
            { children }
        </OrderContext.Provider>
    )
}



