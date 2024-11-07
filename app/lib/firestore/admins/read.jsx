"use client";
import { collection, getDoc, onSnapshot, doc } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../../firebase";

export function useAdmins() {
  const { data, error } = useSWRSubscription(["admins"], ([path], { next }) => {
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
  });

  return { data, error: error?.meesage, isLoading: data === undefined };
}

export const getAdmins = async ({ id }) => {
  const data = await getDoc(doc(db, `admins/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};
