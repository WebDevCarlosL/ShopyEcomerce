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

const createNewBrand = async ({ brand, image }) => {
  const newId = doc(collection(db, "ids")).id;

  await setDoc(doc(db, "brands", newId), {
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

const updateBrand = async ({ id, brand, image }) => {
  await updateDoc(doc(db, `brands/${id}`), {
    id,
    name: brand,
    image,
    timestampUpdated: Timestamp.now(),
  });
};

export { createNewBrand, deleteBrand, updateBrand };
