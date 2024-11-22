import { Rating } from "@mui/material";
import { Button } from "@nextui-org/button";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../context/AuthContext";

const ProductsGridView = ({ products }) => {
  return (
    <section className="mb-5 mt-5 flex w-full justify-center">
      <div className="flex max-w-[900px] flex-col gap-5 p-5">
        <h2 className="text-center text-lg font-semibold">Productos</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGridView;

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4">
      <div className="relative w-full">
        <img
          className="h-[150px] rounded-lg object-cover"
          src={product?.image}
          alt={product?.name}
        />
        <div className="absolute right-[-10px] top-[-10px]">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
          {product?.name}
        </h2>
      </Link>
      <div>
        <h2 className="font-semibold text-green-500">
          ${product?.saleprice}{" "}
          <span className="text-xs text-gray-600 line-through">
            ${product?.price}
          </span>
        </h2>
      </div>
      <p className="line-clamp-2 text-xs text-gray-500 md:text-base">
        {product?.shortdescription}
      </p>
      <div className="flex items-center gap-3">
        <Rating
          size="small"
          name="item-rating"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
        <h2 className="text-xs text-gray-400">{0}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-xs text-white">
          Buy Now
        </button>
        <Button isIconOnly size="sm">
          <ShoppingCart size={13} />
        </Button>
      </div>
    </div>
  );
}
