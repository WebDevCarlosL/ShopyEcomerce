import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { uploadImageToCloudinary } from "../../../helpers/Cloudinary";

import { db } from "../../firebase";

const createNewProduct = async ({ data, featureImage, imageList }) => {
  if (!data.name) {
    throw new Error("Rellene campo nombre del producto");
  }
  if (!data.shortdescription) {
    throw new Error("Rellene campo descripción del producto");
  }
  if (!data.brandId) {
    throw new Error("Seleccione una marca");
  }
  if (!data.categoryId) {
    throw new Error("Seleccione una categoria");
  }
  if (!data.stock) {
    throw new Error("Ingrese el stock del producto");
  }
  if (!data.price) {
    throw new Error("Ingrese el precio del producto");
  }
  if (!featureImage) {
    throw new Error("Ingrese una imagen destacada");
  }
  if (!imageList || imageList.length === 0) {
    throw new Error("Ingrese al menos una imagen adicional");
  }

  const imageUrl = await uploadImageToCloudinary(featureImage);
  const imageUrls = await Promise.all(
    imageList.map(async (image) => {
      return await uploadImageToCloudinary(image);
    }),
  );

  const newId = doc(collection(db, "ids")).id;

  await setDoc(doc(db, `products/${newId}`), {
    ...data,
    image: imageUrl,
    imageList: imageUrls,
    id: newId,
    timestampCreated: Timestamp.now(),
  });
};

const deleteProduct = async ({ id }) => {
  if (!id) {
    throw new Error("Debes de colocar un id");
  }
  await deleteDoc(doc(db, `products/${id}`));
};

// const updateProduct = async ({ data, featureImage, imageList, id }) => {
//   if (!data.name) {
//     throw new Error("Rellene campo nombre del producto");
//   }
//   if (!data.shortdescription) {
//     throw new Error("Rellene campo descripción del producto");
//   }
//   if (!data.brandId) {
//     throw new Error("Seleccione una marca");
//   }
//   if (!data.categoryId) {
//     throw new Error("Seleccione una categoria");
//   }
//   if (!data.stock) {
//     throw new Error("Ingrese el stock del producto");
//   }
//   if (!data.price) {
//     throw new Error("Ingrese el precio del producto");
//   }
//   if (!featureImage) {
//     throw new Error("Ingrese una imagen destacada");
//   }
//   if (!imageList || imageList.length === 0) {
//     throw new Error("Ingrese al menos una imagen adicional");
//   }
//   if (!id) {
//     throw new Error("El id es requerido");
//   }

//   const featureImageUrl = await uploadImageToCloudinary(featureImage);

//   const imageUrls = await Promise.all(
//     imageList.map(async (image) => {
//       return await uploadImageToCloudinary(image);
//     }),
//   );

//   await updateDoc(doc(db, `products/${id}`), {
//     ...data,
//     image: featureImageUrl,
//     imageList: imageUrls,
//     id,
//     timestampUpdated: Timestamp.now(),
//   });
// };

const updateProduct = async ({ data, featureImage, imageList, id }) => {
  if (!data.name) {
    throw new Error("Rellene campo nombre del producto");
  }
  if (!data.shortdescription) {
    throw new Error("Rellene campo descripción del producto");
  }
  if (!data.brandId) {
    throw new Error("Seleccione una marca");
  }
  if (!data.categoryId) {
    throw new Error("Seleccione una categoria");
  }
  if (!data.stock) {
    throw new Error("Ingrese el stock del producto");
  }
  if (!data.price) {
    throw new Error("Ingrese el precio del producto");
  }

  if (id != data?.id) {
    throw new Error("El Id es invalido");
  }

  try {
    await updateDoc(doc(db, `products/${data?.id}`), {
      ...data,
      image: featureImage,
      imageList: imageList,
      timestampUpdated: Timestamp.now(),
    });
  } catch (error) {
    console.log(error);
  }
};

export { createNewProduct, deleteProduct, updateProduct };
