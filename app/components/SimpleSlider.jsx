"use client";

import { Button } from "@nextui-org/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "../context/AuthContext";

const SimpleSlider = ({ featuredProducts }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {featuredProducts?.map((product, index) => {
          return (
            <div key={index}>
              <div className="flex w-full flex-col-reverse bg-[#f8f8f8] p-5 md:flex-row md:px-24 md:py-20">
                <div className="flex flex-1 flex-col gap-3 md:gap-10">
                  <h2 className="text-xs text-gray-500 md:text-base">
                    NEW FASHION
                  </h2>
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product?.id}`}>
                      <h1 className="text-xl font-bold md:text-4xl">
                        {product?.name}
                      </h1>
                    </Link>
                    <h2 className="line-clamp-2 max-w-96 text-xs text-gray-600 md:text-sm">
                      {product?.shortdescription}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="bg-blue-500 text-xs text-white md:text-sm">
                      BUY NOW
                    </Button>
                    <Button className="border-2 border-blue-500 bg-white text-xs text-blue-500 md:text-sm">
                      ADD TO CART
                    </Button>
                    <AuthContextProvider>
                      <FavoriteButton productId={product?.id} />
                    </AuthContextProvider>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link href={`/products/${product?.id}`}>
                    <img
                      className="h-[120px] md:h-[23rem]"
                      src={product?.image}
                      alt={product?.name}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default SimpleSlider;
