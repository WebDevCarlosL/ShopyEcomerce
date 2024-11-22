"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Slider from "react-slick";

const CollectionsSlider = ({ collections }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden p-5">
      <Slider {...settings}>
        {collections?.map((collection, index) => {
          return (
            <div key={index} className="px-5">
              <div className="flex w-full gap-4 rounded-xl bg-gradient-to-tr from-[#cce7f5] to-[#d9e2f1] p-7">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-base font-bold md:text-lg">
                      {collection?.name}
                    </h1>
                    <h2 className="line-clamp-2 max-w-96 text-xs text-gray-600 md:text-sm">
                      {collection?.subTitle}
                    </h2>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/collections/${collection?.id}`}>
                      <button className="rounded-lg bg-blue-500 px-4 py-2 text-xs text-white md:text-sm">
                        SHOW NOW
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center">
                  <img
                    className="h-[130px] md:h-[130px]"
                    src={collection?.image}
                    alt={collection?.name}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default CollectionsSlider;
