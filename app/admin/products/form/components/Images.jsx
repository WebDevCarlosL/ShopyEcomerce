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

  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-lg shadow-black/20">
      <h2 className="font-semibold">Imagenes</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="featureImage" className="text-xs text-gray-500">
          Imagen destacada <span className="text-red-500">*</span>
        </label>
        <div className="flex justify-center">
          {featureImage && (
            <img
              className="h-10 w-10 rounded-lg object-cover"
              src={URL.createObjectURL(featureImage)}
              alt="Vista previa"
            />
          )}
        </div>
        <input
          type="file"
          name="featureImage"
          id="featureImage"
          onChange={handleFeatureImageChange}
          className="w-full rounded border px-4 py-2 outline-none"
          ref={ref}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="imagelist" className="text-xs text-gray-500">
          Imagenes Adicionales <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {imageList &&
            imageList.map((file, index) => (
              <img
                key={index}
                className="h-10 w-10 rounded-lg object-cover"
                src={URL.createObjectURL(file)}
                alt={`Vista previa ${index + 1}`}
              />
            ))}
        </div>
        <input
          type="file"
          name="imagelist"
          id="imagelist"
          multiple
          onChange={handleImageListChange}
          className="w-full rounded border px-4 py-2 outline-none"
          ref={ref}
          required
        />
      </div>
    </section>
  );
};

export default Images;
