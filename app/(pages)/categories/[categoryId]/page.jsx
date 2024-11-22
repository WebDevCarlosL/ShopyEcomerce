"use client";

import { ProductCard } from "@/app/components/ProductsGridView";
import { useCategory } from "@/app/hooks/useCategoryId";
import { getProductsByCategory } from "@/app/lib/firestore/products/read_server";
import { CircularProgress } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryId } = useParams();
  const category = useCategory(categoryId);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProductsByCategory({ categoryId });
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryId) {
      fetchProducts();
    } else {
      console.error("No categoryId provided");
    }
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <main className="w-full p-5 py-5 md:p-10">
      <h2 className="text-center text-4xl font-semibold">
        {category?.category?.name}
      </h2>
      <div className="flex w-full flex-col gap-6 p-5">
        <div>
          {products?.length === 0 ? (
            <h2 className="mx-auto text-center text-lg font-semibold">
              No hay productos en esta categoria
            </h2>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
              {products?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
