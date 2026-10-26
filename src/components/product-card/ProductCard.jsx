import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router";




export default function ProductCard({ prod }) {
    const date = new Date(prod.createdAt)
    const publicDate = date.toLocaleDateString("es-AR");
    const [ heart, setHeart ] = useState(false)
    const { addOrderItem } = useOrder();

    return (
        <article className="group bg-surface overflow-hidden rounded-lg border border-borders flex flex-col transition duration-300 hover:bg-surface-hover hover:border-accent">
            <div className="aspect-4/5 overflow-hidden relative bg-surface-hover">
                <Link to={`/product-detail/${prod._id}`}>
                    <img src={`http://localhost:3000/images/prodcuts/${prod.image}`} alt={prod.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                </Link>
                <span className="absolute top-3 left-3 px-2 py-1 rounded-full  bg-bg/50 backdrop-blur-sm text-xs tracking-wide font-medium capitalize">{prod.category.name}</span>
                {heart ? <FontAwesomeIcon icon={faSolidHeart} className="absolute top-3 right-3 px-2 py-1 text-accent text-lg cursor-pointer" onClick={() => setHeart(!heart)}/> :
                <FontAwesomeIcon icon={faHeart} className="absolute top-3 right-3 px-2 py-1  text-lg cursor-pointer" onClick={() => setHeart(!heart)}/>}
            </div>
            <div className="p-4 flex flex-col gap-2 flex-1">
                <Link to={`/product-detail/${prod._id}`}>
                    <h3 className="text-lg font-heading text-text truncate">{prod.name}</h3>
                </Link>

                <p className="text-sm text-text-muted line-clamp-2 leading-normal">{prod.description}</p>
                <span className="text-xs font-normal text-text-muted tabular-nums">{publicDate}</span>
                <div className="mt-auto pt-3 flex justify-between items-center">
                    <p className="text-xl font-medium text-accent tabular-nums">{`$ ${prod.price}`}</p>
                    <div className="flex gap-3 ">
                        <button onClick={() => addOrderItem(prod)} className="px-4 py-2 rounded-md bg-transparent text-accent-hover text-sm font-medium hover:bg-accent-hover hover:text-text-on-accent cursor-pointer transition-all duration-200 border-2 border-accent-hover">Añadir</button>
                    </div>
                </div>
            </div>
            
        </article>
    )
}