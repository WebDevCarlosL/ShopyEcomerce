"use client";

import {
  doc,
  collection,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const createNewCategory = async ({ slug, category, image, publicId }) => {
  // if (!image) {
  //   throw new Error("Debes de colocar una imagen");
  // }

  // if (!image.trim() === "") {
  //   throw new Error("Debes de colocar una imagen");
  // }

  // if (!data?.name) {
  //   throw new Error("Debes de colocar un nombre");
  // }
  // if (!data?.slug) {
  //   throw new Error("Debes de colocar un slug");
  // }

  const newId = doc(collection(db, "ids")).id;
  // const imageRef = ref(storage, `categories/${newId}`);
  // await uploadBytes(imageRef, image);
  // const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `categories/${newId}`), {
    // ...data,
    publicId,
    slug,
    name: category,
    id: newId,
    image,
    timestampCreated: Timestamp.now(),
  });
};

const deleteCategory = async ({ id }) => {
  if (!id) {
    throw new Error("Debes de colocar un id");
  }
  await deleteDoc(doc(db, `categories/${id}`));
};

const updateCategory = async ({ id, slug, category, image, publicId }) => {
  await updateDoc(doc(db, `categories/${id}`), {
    id,
    slug,
    name: category,
    image,
    timestampUpdated: Timestamp.now(),
    publicId,
  });
};

export { createNewCategory, deleteCategory, updateCategory };