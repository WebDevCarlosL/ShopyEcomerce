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

const createNewCategory = async ({ slug, category, image }) => {
  const newId = doc(collection(db, "ids")).id;
  await setDoc(doc(db, `categories/${newId}`), {
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

const updateCategory = async ({ id, slug, category, image }) => {
  await updateDoc(doc(db, `categories/${id}`), {
    id,
    slug,
    name: category,
    image,
    timestampUpdated: Timestamp.now(),
  });
};

export { createNewCategory, deleteCategory, updateCategory };
