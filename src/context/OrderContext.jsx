import { createContext, useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";

const OrderContext = createContext()

export const useOrder = () => useContext(OrderContext)

export const OrderProvider = ({ children }) => {
    //estado de la orden
    const [ order, setOrder ] = useState(JSON.parse(localStorage.getItem('order')) || []);
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const [total, setTotal] = useState(0);
    const totalQuantity = order.reduce((acc, prod) => acc + prod.quantity, 0);

    
    //estado de desplegar o no el sidebar
    //estados total

    //function agregar producto
    function addOrderItem(prod) {
        // Buscar en la orden si existe el producto y si existe aniadimos 1 a cantidad
        const product = order.find(producto => producto.id === prod.id);

        if(product) {
            handleChangeQuantity(product.id, product.quantity + 1);
            
            return
        } else {
            // Si no existe lo aniadimos al array
            setOrder([...order, { ...prod, quantity: 1}]);
        }
    }
    //calcular total
    function calculateTotal() {
        let totalCount = 0;
        

        order.forEach(prod => {
            totalCount += prod.price * prod.quantity
        })

        setTotal(totalCount);
        
    }

    useEffect(() => {
        //Se ejecuta o llaman a las funciones cuando el estado order se actualiza
        localStorage.setItem("order", JSON.stringify(order));
        calculateTotal();
    }, [order]);

    //Funcion para manejar los cambios de cantidad
    function handleChangeQuantity(id, quantity) {
        // Buscar el producto por su id
        // Cambiarle la cantidad
        // Actualizar mi estado order
        const quantitySafe = Math.max(1, Math.floor( Number(quantity) || 1))

        const updatedOrder = order.map(item => {
            if(item.id === id) {
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
                const updOrder = order.filter(prod => prod.id !== id);
                setOrder(updOrder);
            }
        })
    }

    //toggle
    function toggleSidebarOrder() {
        setSidebarToggle(!sidebarToggle);
    }


    return (
        <OrderContext.Provider value={{order, addOrderItem, total, handleChangeQuantity, removeItem, toggleSidebarOrder, sidebarToggle, totalQuantity}}>
            { children }
        </OrderContext.Provider>
    )
}



