"use client";

import {
  doc,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const createNewAdmin = async ({ nameAdmin, emailAdmin, image }) => {
  const newId = emailAdmin;

  await setDoc(doc(db, `admins/${newId}`), {
    name: nameAdmin,
    email: emailAdmin,
    id: newId,
    image,
    timestampCreated: Timestamp.now(),
  });
};

const deleteAdmin = async ({ id }) => {
  if (!id) {
    throw new Error("Debes de colocar un id");
  }
  await deleteDoc(doc(db, `admins/${id}`));
};

const updateAdmin = async ({ id, image, emailAdmin, nameAdmin }) => {
  if (id === emailAdmin) {
    await updateDoc(doc(db, `admins/${id}`), {
      id,
      email: emailAdmin,
      name: nameAdmin,
      image,
      timestampUpdated: Timestamp.now(),
    });
  } else {
    const newId = emailAdmin;
    await deleteDoc(doc(db, `admins/${id}`));
    await setDoc(doc(db, `admins/${newId}`), {
      id: newId,
      email: emailAdmin,
      name: nameAdmin,
      image,
      timestampUpdated: Timestamp.now(),
    });
  }
};

export { createNewAdmin, deleteAdmin, updateAdmin };
