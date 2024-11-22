"use client";

import { useState } from "react";

const Photos = ({ imageList }) => {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);
  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-5 flex w-full flex-col gap-3 md:mt-0">
      <div className="flex w-full justify-center">
        <img
          className="h-[300px] object-cover md:h-[350px]"
          src={selectedImage}
          alt=""
        />
      </div>
      <div className="mb-10 mt-5 flex cursor-pointer flex-wrap items-center justify-center gap-3">
        {imageList?.map((image, index) => (
          <div
            className="flex h-[80px] w-[80px] items-center justify-center gap-3 rounded border p-4"
            onClick={() => setSelectedImage(image)}
            key={index}
          >
            <img className="object-cover" src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
