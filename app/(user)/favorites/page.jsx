"use client";

import { ProductCard } from "@/app/components/ProductsGridView";
import { useAuth } from "@/app/context/AuthContext";
import { useProduct } from "@/app/hooks/useProductId";
import { useUser } from "@/app/lib/firestore/user/read";

const Page = () => {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  return (
    <main className="flex w-full flex-col items-center justify-center gap-3 p-5">
      <h1 className="text-2xl font-bold">Favoritos</h1>
      <section className="grid w-full grid-cols-2 gap-3 md:max-w-[900px] md:grid-cols-3 lg:grid-cols-4">
        {data?.favorites?.map((productId) => {
          return (
            <div key={productId} className="">
              <ProductCardId productId={productId} />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Page;

function ProductCardId({ productId }) {
  const { product } = useProduct(productId);
  console.log("desde favoritos:", product);
  return <ProductCard product={product} />;
}
