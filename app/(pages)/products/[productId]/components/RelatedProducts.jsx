"use client";
import { ProductCard } from "@/app/components/ProductsGridView";
import { getProductsByCategory } from "@/app/lib/firestore/products/read_server";
import { useEffect, useState } from "react";

const RelatedProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProductsByCategory({ categoryId });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryId) {
      fetchProducts();
    } else {
      console.log("No categoryId provided");
    }
  }, [categoryId]);

  return (
    <div className="flex w-full flex-col gap-5 p-5">
      <h2 className="text-center text-lg font-semibold">
        Productos Relacionados
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
