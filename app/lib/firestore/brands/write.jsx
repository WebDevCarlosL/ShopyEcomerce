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

const createNewBrand = async ({ brand, image, publicId }) => {
  const newId = doc(collection(db, "ids")).id;

  await setDoc(doc(db, "brands", newId), {
    publicId,
    name: brand,
    id: newId,
    image,
    timestampCreated: Timestamp.now(),
  });
};

const deleteBrand = async ({ id }) => {
  if (!id) {
    throw new Error("Debes de colocar un id");
  }
  await deleteDoc(doc(db, `brands/${id}`));
};

const updateBrand = async ({ id, brand, image, publicId }) => {
  await updateDoc(doc(db, `brands/${id}`), {
    id,
    name: brand,
    image,
    timestampUpdated: Timestamp.now(),
    publicId,
  });
};

export { createNewBrand, deleteBrand, updateBrand };
