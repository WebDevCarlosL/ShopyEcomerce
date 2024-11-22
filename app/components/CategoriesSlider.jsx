"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import Slider from "react-slick";

const CategoriesSlider = ({ categories }) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (categories.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center gap-8 overflow-hidden p-5 md:p-10">
      <div className="flex w-full justify-center">
        <h2 className="text-lg font-semibold">Shop by Category</h2>
      </div>
      <Slider {...settings}>
        {categories?.map((category, index) => (
          <Link key={index} href={`/categories/${category?.id}`}>
            <div className="px-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border p-2 md:h-32 md:w-32 md:p-5">
                  <img src={category?.image} alt={category?.name} />
                </div>
                <h2 className="font-semibold">{category?.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};
export default CategoriesSlider;
