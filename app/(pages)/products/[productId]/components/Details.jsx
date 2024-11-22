"use client";

import { useCategory } from "../../../../hooks/useCategoryId";
import { useBrand } from "../../../../hooks/useBrandId";
import { Button } from "@nextui-org/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const Details = ({ product }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>
      <h1 className="text-xl font-semibold md:text-4xl">{product?.name}</h1>
      <h2 className="line-clamp-3 text-sm text-gray-600 md:line-clamp-4">
        {product?.shortdescription}
      </h2>
      <h3 className="w-auto text-lg font-bold text-green-500">
        {product?.saleprice}{" "}
        <span className="text-[12px] text-gray-700 line-through">
          {" "}
          ${product?.price}
        </span>
      </h3>
      <div className="flex flex-wrap items-center gap-3">
        <Button className="bg-black text-white">Buy Now</Button>
        <Button variant="bordered" className="">
          Add to Cart
        </Button>

        <Button isIconOnly color="danger" variant="bordered">
          <Heart size={13} />
        </Button>
      </div>
      <div className="flex flex-col gap-2 py-6">
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
};

export default Details;

function Category({ categoryId }) {
  const { category } = useCategory(categoryId);

  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-3 rounded-full border px-3 py-1">
        <img
          className="h-5 rounded-full"
          src={category?.image}
          alt={category?.name}
        />
        <h4 className="text-xs font-bold">{category?.name}</h4>
      </div>
    </Link>
  );
}

function Brand({ brandId }) {
  const { brand } = useBrand(brandId);

  return (
    <div className="flex items-center gap-3 rounded-full border px-3 py-1">
      <img className="h-5 rounded-full" src={brand?.image} alt={brand?.name} />
      <h4 className="text-xs font-bold">{brand?.name}</h4>
    </div>
  );
}
