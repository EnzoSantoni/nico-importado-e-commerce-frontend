import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext"
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function OrderSidebar() {
    const { order, total, handleChangeQuantity, removeItem,sidebarToggle, toggleSidebarOrder, totalQuantity } = useOrder();

    return (
        <>
            <div className={`fixed inset-0 z-10 bg-bg/60 transition-opacity duration-300 motion-reduce:transition-none ${sidebarToggle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => toggleSidebarOrder()}>

            </div>
            <div className={`fixed top-0 right-0 bottom-0 z-20 w-full sm:w-100 flex flex-col overflow-hidden bg-surface border-l border-borders transition-transform duration-300 ease-in-out motion-reduce:transition-none ${sidebarToggle ? 'translate-x-0' : 'translate-x-full'}`} inert={!sidebarToggle}>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-5 border-b border-borders">
                        <h2 className="ffont-heading text-xl text-text">Orden Actual:</h2>
                        <FontAwesomeIcon icon={faXmark} className="size-8 flex items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-surface-hover cursor-pointer transition-colors duration-200" onClick={() => toggleSidebarOrder()}/>
                    </div>
                    
                    <ul className="flex-1 overflow-y-auto px-4 divide-y divide-borders">
                        {order.map(product => {
                            return (
                                <li className="flex items-center gap-3 py-3" key={product.id}>
                                        <img className="size-10 shrink-0 rounded-md object-cover bg-surface-hover" src={product.image ?? 'https://img.icons8.com/bubbles/1200/product.jpg'} alt="Imagen del producto" />
                                        <div className="flex-1 min-w-0 truncate text-sm text-text" title={product.name}>{product.name}</div>
                                        <div className="w-20 shrink-0 text-right text-sm text-text-muted tabular-nums">$ {product.price}</div>
                                        <input type="number" value={product.quantity} className="w-12 h-8 shrink-0 rounded-md border border-borders bg-bg text-center text-sm text-text tabular-nums outline-none focus:border-accent" onChange={(evt) => handleChangeQuantity(product.id, evt.target.value)} min={1} />
                                        <button className="size-8 shrink-0 flex items-center justify-center rounded-md text-text-muted hover:text-error hover:bg-surface-hover cursor-pointer transition-colors duration-200" title="Elminar producto" onClick={() => removeItem(product.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div className="border-t border-borders p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">Items</span>
                        <span className="text-sm text-text tabular-nums">{totalQuantity}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm text-text-muted">Total</span>
                        <span className="text-2xl font-medium text-accent tabular-nums">{total.toLocaleString('es-AR',{ style: 'currency', currency: 'ARS'})}</span></div>
                </div>

                <div className="px-4 pb-4 flex flex-col gap-2">
                    <button className="w-full py-2.5 rounded-md border border-accent bg-accent text-sm font-medium text-text-on-accent hover:bg-accent-hover hover:border-accent-hover cursor-pointer transition-colors duration-200">Finalizar compra</button>
                    <button className="w-full py-2 rounded-md border border-borders text-sm text-text-muted hover:text-error hover:border-error cursor-pointer transition-colors duration-200">Vaciar orden</button>
                </div>
            </div>
        </>
    )
}
