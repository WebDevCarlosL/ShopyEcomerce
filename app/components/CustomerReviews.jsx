import { Rating } from "@mui/material";
import React from "react";

const CustomerReviews = () => {
  const list = [
    {
      name: "Jhon Doe",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.",
      rating: 4.5,
      imageLink: "https://i.imgur.com/LDOO4Qs.jpg",
    },
    {
      name: "Emma Wattson",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.",
      rating: 4.5,
      imageLink: "https://i.imgur.com/LDOO4Qs.jpg",
    },
    {
      name: "Oscar Nomman",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.",
      rating: 3.5,
      imageLink: "https://i.imgur.com/LDOO4Qs.jpg",
    },
    {
      name: "Penny Lu",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, officiis.",
      rating: 5,
      imageLink: "https://i.imgur.com/LDOO4Qs.jpg",
    },
  ];

  return (
    <section className="mt-5 flex justify-center">
      <div className="flex w-full flex-col gap-3 p-5 md:max-w-[900px]">
        <h2 className="mb-5 text-center text-xl font-semibold">
          Nuestros Clientes
        </h2>
        <div className="grid grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4">
          {list?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border p-4"
            >
              <img
                src={item?.imageLink}
                alt={item?.name}
                className="h-[60px] w-[60px] rounded-full object-cover"
              />
              <h2 className="text-sm font-semibold">{item?.name}</h2>
              <Rating
                size="small"
                name="customer-rating"
                defaultValue={item?.rating}
                precision={item?.rating}
                readOnly
              />
              <p className="line-clamp-2 text-center text-sm text-gray-500">
                {item?.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
