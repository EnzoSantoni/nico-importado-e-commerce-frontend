import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function OrderSidebar() {
  const {
    order,
    total,
    handleChangeQuantity,
    removeItem,
    sidebarToggle,
    toggleSidebarOrder,
    totalQuantity,
    postOrder,
    resetOrders,
  } = useOrder();
  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-bg/60 transition-opacity duration-300 motion-reduce:transition-none ${sidebarToggle ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => toggleSidebarOrder()}
      ></div>
      <div
        className={`fixed top-0 right-0 bottom-0 z-20 flex w-full flex-col overflow-hidden border-l border-borders bg-surface transition-transform duration-300 ease-in-out motion-reduce:transition-none sm:w-100 ${sidebarToggle ? "translate-x-0" : "translate-x-full"}`}
        inert={!sidebarToggle}
      >
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-borders px-4 py-5">
            <h2 className="font-heading text-xl text-text">Orden Actual:</h2>
            <FontAwesomeIcon
              icon={faXmark}
              className="flex size-8 cursor-pointer items-center justify-center rounded-md text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text"
              onClick={() => toggleSidebarOrder()}
            />
          </div>

          <ul className="flex-1 divide-y divide-borders overflow-y-auto px-4">
            {order.map((product) => {
              return (
                <li className="flex items-center gap-3 py-3" key={product._id}>
                  <img
                    className="size-10 shrink-0 rounded-md bg-surface-hover object-cover"
                    src={
                      product.image
                        ? `http://localhost:3000/images/prodcuts/${product.image}`
                        : "https://img.icons8.com/bubbles/1200/pro"
                    }
                    alt="Imagen del producto"
                  />
                  <div
                    className="min-w-0 flex-1 truncate text-sm text-text"
                    title={product.name}
                  >
                    {product.name}
                  </div>
                  <div className="w-20 shrink-0 text-right text-sm text-text-muted tabular-nums">
                    $ {product.price}
                  </div>
                  <input
                    type="number"
                    value={product.quantity}
                    className="h-8 w-12 shrink-0 rounded-md border border-borders bg-bg text-center text-sm text-text tabular-nums outline-none focus:border-accent"
                    onChange={(evt) =>
                      handleChangeQuantity(product._id, evt.target.value)
                    }
                    min={1}
                  />
                  <button
                    className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-error"
                    title="Eliminar producto"
                    onClick={() => removeItem(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-borders p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-muted">Items</span>
            <span className="text-sm text-text tabular-nums">
              {totalQuantity}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-text-muted">Total</span>
            <span className="text-2xl font-medium text-accent tabular-nums">
              {total.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 pb-4">
          <button
            className="w-full cursor-pointer rounded-md border border-accent bg-accent py-2.5 text-sm font-medium text-text-on-accent transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover"
            onClick={() => postOrder()}
          >
            Finalizar compra
          </button>
          <button
            className="w-full cursor-pointer rounded-md border border-borders py-2 text-sm text-text-muted transition-colors duration-200 hover:border-error hover:text-error"
            onClick={() => resetOrders()}
          >
            Vaciar orden
          </button>
        </div>
      </div>
    </>
  );
}
