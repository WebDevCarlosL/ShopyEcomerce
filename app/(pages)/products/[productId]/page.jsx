"use client";
import { useParams } from "next/navigation";
import { useProduct } from "../../../hooks/useProductId";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";
import Photos from "./components/Photos";
import Details from "./components/Details";
import Reviews from "./components/Reviews";
import RelatedProducts from "./components/RelatedProducts";

const Page = () => {
  const { productId } = useParams();
  const { product, isLoading, isError } = useProduct(productId);

  console.log(product);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (isError)
    return (
      <div className="flex h-screen items-center justify-center">
        Error al cargar el producto.{" "}
        <Link href={"/"} className="text-blue-500 underline">
          Regresar
        </Link>
      </div>
    );

  return (
    <main className="p-5 md:p-10">
      {/* Photo, detail */}
      <section className="mt-5 flex w-full flex-col-reverse gap-3 md:flex-row">
        <Photos imageList={[product?.image, ...(product?.imageList ?? [])]} />

        <Details product={product} />
      </section>

      <section>
        <Reviews productId={productId} />
      </section>

      <RelatedProducts categoryId={product?.categoryId} />
    </main>
  );
};

export default Page;
