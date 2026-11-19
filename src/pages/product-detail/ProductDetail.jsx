import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useOrder } from "../../context/OrderContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function ProductDetail() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addOrderItem } = useOrder();

  async function getProductById(id) {
    try {
      const response = await axios.get(`${URL}/products/${id}`);
      console.log(response);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <Link
          to={"/"}
          className="self-start text-sm text-text-muted transition-colors hover:text-text"
        >
          Volver
        </Link>
        <div className="grid animate-pulse grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="aspect-4/5 rounded-lg bg-surface-hover"></div>
          <div className="flex flex-col gap-4">
            <div className="h-3 w-24 rounded-md bg-surface-hover"></div>
            <div className="h-9 w-3/4 rounded-md bg-surface-hover"></div>
            <div className="h-8 w-32 rounded-md bg-surface-hover"></div>
            <div className="h-12 w-full rounded-md bg-surface-hover"></div>
            <div className="flex flex-col gap-2 border-t border-borders pt-4">
              <div className="h-4 w-full rounded-md bg-surface-hover"></div>
              <div className="h-4 w-5/6 rounded-md bg-surface-hover"></div>
              <div className="h-4 w-2/3 rounded-md bg-surface-hover"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <h1 className="font-heading text-3xl text-text md:text-4xl">
          No se pudo encontrar el producto
        </h1>
        <p className="text-sm text-text-muted">
          Puede que lo hayan dado de baja o que el link no sea correcto.
        </p>
        <Link
          to={"/"}
          className="rounded-md border border-accent bg-accent px-5 py-2.5 text-sm font-medium text-text-on-accent transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <Link
          to={"/"}
          className="self-start text-sm text-text-muted transition-colors hover:text-text"
        >
          Volver
        </Link>
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
          <div className="aspect-4/5 overflow-hidden rounded-lg border border-borders bg-surface">
            <img
              className="h-full w-full object-cover"
              src={`http://localhost:3000/images/prodcuts/${product.image}`}
              alt={product.name}
            />
          </div>
          <div className="flex flex-col gap-4 md:sticky md:top-8">
            <span className="text-xs font-medium tracking-wide text-text-muted uppercase">
              {product.category?.name}
            </span>
            <h1 className="font-heading text-3xl text-text md:text-4xl">
              {product.name}
            </h1>
            <p className="text-3xl font-medium text-accent tabular-nums">
              {Number(product.price).toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
            <button
              className="w-full cursor-pointer rounded-md border border-accent bg-accent py-3 text-base font-medium text-text-on-accent transition-colors duration-200 hover:border-accent-hover hover:bg-accent-hover"
              onClick={() => addOrderItem(product)}
            >
              Añadir al carrito
            </button>
            <div className="flex flex-col gap-2 border-t border-borders pt-4">
              <h2 className="text-sm font-medium text-text">Descripción</h2>
              <p className="text-base leading-normal text-text-muted">
                {product.description}
              </p>
            </div>
            <span className="text-xs text-text-muted tabular-nums">
              Publicado el{" "}
              {new Date(product.createdAt).toLocaleDateString("es-AR")}{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
