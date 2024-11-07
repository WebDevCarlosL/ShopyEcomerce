"use client";
import { collection, getDoc, onSnapshot, doc, query } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../../firebase";

export function useProducts({ pageLimit }) {
  const { data, error } = useSWRSubscription(
    ["products"],
    ([path], { next }) => {
      const ref = collection(db, path);
      let q = query(ref, limit(pageLimit ?? 10));
      const unsub = onSnapshot(
        q,
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

export const getProducts = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};
