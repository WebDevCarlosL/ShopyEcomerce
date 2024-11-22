"use client";
import { collection, getDoc, onSnapshot, doc } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../../firebase";

export function useUser({ uid }) {
  const { data, error } = useSWRSubscription(
    ["users", uid],
    ([path, uid], { next }) => {
      const ref = doc(db, `users/${uid}`);
      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.exists() ? snapshot.data() : null),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return { data, error: error?.meesage, isLoading: data === undefined };
}
