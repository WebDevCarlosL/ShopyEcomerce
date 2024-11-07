import axios from "axios";

const cloudinaryUpload = async (file) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "shopy");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    throw new Error("Error al subir imagen");
  }
};

export { cloudinaryUpload };
