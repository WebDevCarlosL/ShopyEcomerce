"use client";
import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;
  const preset = process.env.NEXT_PUBLIC_PRESET;
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  if (!cloudName || !preset || !cloudinary_url) {
    throw new Error("Faltan variables de entorno necesarias.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  try {
    const response = await axios.post(
      `${cloudinary_url}/${cloudName}/image/upload`,
      formData,
    );

    console.log(response);

    if (!response.data.secure_url) {
      throw new Error("Error al obtener la URL de la imagen.");
    }

    return response.data.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen.");
  }
};

export const extractPublicId = (url) => {
  console.log(url);
  const parts = url.split("/");
  const lastPart = parts.pop().split(".");
  return lastPart[0];
};

// export const deleteImageFromCloudinary = async (publicId) => {
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;
//   const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
//   const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
//   const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
//   const timestamp = Math.floor(Date.now() / 1000);
//   const signature = generateSignature(publicId, apiSecret, timestamp);

//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

//   // const response = await fetch(`${cloudinary_url}/${cloudName}/image/destroy`, {
//   //   method: "POST",
//   //   body: JSON.stringify({
//   //     public_id: publicId,
//   //     api_key: apiKey,
//   //     signature: signature,
//   //     timestamp: timestamp,
//   //   }),
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // });

//   const formData = new FormData();
//   formData.append("public_id", publicId);
//   formData.append("signature", signature);
//   formData.append("api_key", apiKey);
//   formData.append("timestamp", timestamp);

//   try {
//     const response = await axios.post(url, formData);
//     console.log(response);

//     return response.data;
//   } catch (error) {
//     console.error("Error al eliminar la imagen:", error);
//     throw new Error("Error al eliminar la imagen.");
//   }
// };

// Función para eliminar una imagen
// export const deleteImageFromCloudinary = async (publicId) => {
//   cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY,
//     api_key: process.env.NEXT_PUBLIC_API_KEY,
//     api_secret: process.env.NEXT_PUBLIC_API_SECRET,
//   });

//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
//     if (result.result === "ok") {
//       console.log("Imagen eliminada con éxito.");
//     } else {
//       console.error("Error al eliminar la imagen:", result);
//     }
//   } catch (error) {
//     console.error("Error al eliminar la imagen:", error);
//   }
// };

// const generateSignature = (publicId, apiSecret, timestamp) => {
//   const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
//   return btoa(stringToSign);
// };
