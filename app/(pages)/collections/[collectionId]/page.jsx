"use client";

import { useParams } from "next/navigation";
import { ProductCard } from "../../../components/ProductsGridView";

import { useCollectionId } from "@/app/hooks/useCollectionId";
import { useProduct } from "@/app/hooks/useProductId";

export default function Page() {
  const { collectionId } = useParams();

  const { collection } = useCollectionId(collectionId);

  return (
    <main className="flex w-full justify-center p-5 md:px-10 md:py-5">
      <div className="flex max-w-[900px] flex-col gap-6 p-5">
        <div className="flex w-full justify-center">
          <img className="h-[110px]" src={collection?.image} alt="" />
        </div>
        <h1 className="text-center text-4xl font-semibold">
          {collection?.name}
        </h1>
        <h1 className="text-center text-gray-500">{collection?.subTitle}</h1>
        <div className="grid grid-cols-1 items-center justify-center gap-4 justify-self-center md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {collection?.products.map((productId) => {
            return <Product productId={productId} key={productId} />;
          })}
        </div>
      </div>
    </main>
  );
}

function Product({ productId }) {
  const { product } = useProduct(productId);

  return <ProductCard product={product} />;
}
