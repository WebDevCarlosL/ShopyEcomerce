"use client";
import {
  collection,
  getDoc,
  onSnapshot,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../../firebase";

export function useCollections() {
  const { data, error } = useSWRSubscription(
    ["collections"],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data()),
          ),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return { data, error: error?.meesage, isLoading: data === undefined };
}

export const getCollections = async ({ id }) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const getCollectionsSlider = async () => {
  try {
    const list = await getDocs(
      query(collection(db, "products"), where("isFeatured", "==", true)),
    );
    return list.docs.map((snap) => snap.data());
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};
