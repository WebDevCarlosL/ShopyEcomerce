"use client";
import axios from "axios";

export const uploadImageToCloudinary = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;
  const preset = process.env.NEXT_PUBLIC_PRESET;
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${preset}`);

  const response = await axios.post(
    `${cloudinary_url}/${cloudName}/image/upload`,
    formData,
  );

  if (!response.data.secure_url) {
    throw new Error("Error al obtener la URL de la imagen.");
  }

  return {
    imageUrl: response.data.secure_url,
    publicId: response.data.public_id,
  };
};

export const deleteImageFromCloudinary = async (publicId) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;
  const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(publicId, apiSecret, timestamp); // Asegúrate de implementar esta función

  const response = await fetch(`${cloudinary_url}/${cloudName}/image/destroy`, {
    method: "POST",
    body: JSON.stringify({
      public_id: publicId,
      api_key: apiKey,
      signature: signature,
      timestamp: timestamp,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la imagen en Cloudinary");
  }

  const result = await response.json();
  console.log(result);
};

export const extractPublicId = (url) => {
  console.log(url);
  const parts = url.split("/");
  const lastPart = parts.pop().split(".");
  return lastPart[0];
};

const generateSignature = (publicId, apiSecret, timestamp) => {
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return btoa(stringToSign);
};
