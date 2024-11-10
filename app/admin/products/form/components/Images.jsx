"use client";

import { useEffect } from "react";

const Images = ({
  data,
  setFeatureImage,
  featureImage,
  imageList,
  setImageList,
  ref,
}) => {
  const handleFeatureImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFeatureImage(e.target.files[0]);
    }
  };

  // Para manejar múltiples archivos correctamente
  const handleImageListChange = (e) => {
    if (e.target.files.length > 0) {
      setImageList(Array.from(e.target.files));
    }
  };

  console.log("desde el componente imagenes data?image:", data?.image);
  console.log("desde el componente imagenes featureImage:", featureImage);

  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-lg shadow-black/20">
      <h2 className="font-semibold">Imagenes</h2>
      <label htmlFor="imagelist" className="text-xs text-gray-500">
        Imagen <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col gap-1">
        {data?.image && !featureImage && (
          <div className="flex justify-center">
            <img
              className="h-10 w-10 rounded-lg object-cover"
              src={data?.image}
              alt="Vista previa"
            />
          </div>
        )}
        {featureImage && (
          <div className="flex justify-center">
            <img
              className="h-10 w-10 rounded-lg object-cover"
              src={URL.createObjectURL(featureImage)}
              alt="Vista previa"
            />
          </div>
        )}

        <input
          type="file"
          name="featureImage"
          id="featureImage"
          onChange={handleFeatureImageChange}
          className="w-full rounded border px-4 py-2 outline-none"
          ref={ref}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="imagelist" className="text-xs text-gray-500">
          Imagenes Adicionales <span className="text-red-500">*</span>
        </label>

        {(!imageList || imageList?.length === 0) &&
          data?.imageList?.length != 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {data?.imageList?.map((item, index) => {
                return (
                  <img
                    key={index}
                    className="w-20 rounded-lg object-cover"
                    src={item}
                    alt="imagen"
                  />
                );
              })}
            </div>
          )}

        {imageList?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {imageList?.map((item, index) => {
              return (
                <img
                  key={index}
                  className="w-20 rounded-lg object-cover"
                  src={URL.createObjectURL(item)}
                  alt="imagen"
                />
              );
            })}
          </div>
        )}

        <input
          type="file"
          name="imagelist"
          id="imagelist"
          multiple
          onChange={handleImageListChange}
          className="w-full rounded border px-4 py-2 outline-none"
          ref={ref}
        />
      </div>
    </section>
  );
};

export default Images;
