"use client";

import Slider from "react-slick";

const BrandsSlider = ({ brands }) => {
  var settings = {
    dots: false,
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
          dots: false,
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

  if (brands.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center gap-8 overflow-hidden p-5 md:p-10">
      <Slider {...settings}>
        {(brands?.length <= 2
          ? [...brands, ...brands, ...brands]
          : brands
        )?.map((brand, index) => (
          <div key={index} className="px-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex h-20 items-center justify-center overflow-hidden rounded-lg border p-2 md:p-5">
                <img
                  className="h-full w-full object-cover"
                  src={brand?.image}
                  alt={brand?.name}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default BrandsSlider;
