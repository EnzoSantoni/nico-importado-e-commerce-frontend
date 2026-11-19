import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { Link } from "react-router";

export default function ProductCard({ prod }) {
  const date = new Date(prod.createdAt);
  const publicDate = date.toLocaleDateString("es-AR");
  const [heart, setHeart] = useState(false);
  const { addOrderItem } = useOrder();

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-borders bg-surface transition duration-300 hover:border-accent hover:bg-surface-hover">
      <div className="relative aspect-4/5 overflow-hidden bg-surface-hover">
        <Link to={`/product-detail/${prod._id}`}>
          <img
            src={`http://localhost:3000/images/prodcuts/${prod.image}`}
            alt={prod.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute top-3 left-3 rounded-full bg-bg/50 px-2 py-1 text-xs font-medium tracking-wide capitalize backdrop-blur-sm">
          {prod.category.name}
        </span>
        {heart ? (
          <FontAwesomeIcon
            icon={faSolidHeart}
            className="absolute top-3 right-3 cursor-pointer px-2 py-1 text-lg text-accent"
            onClick={() => setHeart(!heart)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            className="absolute top-3 right-3 cursor-pointer px-2 py-1 text-lg"
            onClick={() => setHeart(!heart)}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to={`/product-detail/${prod._id}`}>
          <h3 className="truncate font-heading text-lg text-text">
            {prod.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm leading-normal text-text-muted">
          {prod.description}
        </p>
        <span className="text-xs font-normal text-text-muted tabular-nums">
          {publicDate}
        </span>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-xl font-medium text-accent tabular-nums">{`$ ${prod.price}`}</p>
          <div className="flex gap-3">
            <button
              onClick={() => addOrderItem(prod)}
              className="cursor-pointer rounded-md border-2 border-accent-hover bg-transparent px-4 py-2 text-sm font-medium text-accent-hover transition-all duration-200 hover:bg-accent-hover hover:text-text-on-accent"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
