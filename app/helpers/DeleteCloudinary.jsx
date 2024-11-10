"use client ";
import axios from "axios";
import crypto from "crypto";

const generateSHA1 = (data) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
};

const generateSignature = (publicId, apiSecret) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

export const DeleteImagenCloudinary = async (publicId) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;
  const timestamp = new Date().getTime();
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
  } catch (error) {
    console.error(error);
  }
};
