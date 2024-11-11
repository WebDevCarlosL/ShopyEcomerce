"use client";

import {
  doc,
  collection,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const createNewCollections = async ({ data, image }) => {
  const newId = doc(collection(db, "ids")).id;
  await setDoc(doc(db, `collections/${newId}`), {
    ...data,
    id: newId,
    image,
    timestampCreated: Timestamp.now(),
  });
};

const deleteCollections = async ({ id }) => {
  if (!id) {
    throw new Error("Debes de colocar un id");
  }
  await deleteDoc(doc(db, `collections/${id}`));
};

const updateCollections = async ({ data, image }) => {
  if (!image) {
    throw new Error("Ingrese una imagen destacada");
  }

  if (!data.name) {
    throw new Error("Ingrese el titulo de la coleccion");
  }

  if (!data?.subTitle) {
    throw new Error("Ingrese el subtitulo de la coleccion");
  }

  const id = data?.id;

  await updateDoc(doc(db, `collections/${id}`), {
    id,
    ...data,
    image,
    timestampUpdated: Timestamp.now(),
  });
};

export { createNewCollections, deleteCollections, updateCollections };
