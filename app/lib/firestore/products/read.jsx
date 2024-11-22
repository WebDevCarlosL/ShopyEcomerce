import {
  collection,
  getDoc,
  onSnapshot,
  doc,
  query,
  limit,
  where,
  startAfter,
  getDocs,
} from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { db } from "../../firebase";

export function useProducts({ pageLimit, lastSnapDoc }) {
  const { data, error } = useSWRSubscription(
    ["products", pageLimit, lastSnapDoc],
    ([path], { next }) => {
      const ref = collection(db, path);
      let q = query(ref, limit(pageLimit ?? 10));

      if (lastSnapDoc) {
        q = query(q, startAfter(lastSnapDoc));
      }
      const unsub = onSnapshot(
        q,
        (snapshot) =>
          next(null, {
            list:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs.map((snap) => snap.data()),
            lastSnapDoc:
              snapshot.docs.length === 0
                ? null
                : snapshot.docs[snapshot.docs.length - 1],
          }),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return {
    data: data?.list,
    lastSnapDoc: data?.lastSnapDoc,
    error: error?.message,
    isLoading: !data && !error,
  };
}

// export function useProducts({ pageLimit, searchTerm, lastSnapDoc }) {
//   const { data, error } = useSWRSubscription(
//     ["products", pageLimit, searchTerm, lastSnapDoc],
//     ([path, pageLimit, searchTerm, lastSnapDoc], { next }) => {
//       const ref = collection(db, path);
//       let q;

//       if (lastSnapDoc) {
//         q = query(ref, startAfter(lastSnapDoc), limit(pageLimit ?? 10));
//       }

//       if (searchTerm) {
//         q = query(
//           ref,
//           where("name", ">=", searchTerm),
//           where("name", "<=", searchTerm + "\uf8ff"),
//           limit(pageLimit ?? 10),
//         );
//         console.log("Consulta:", q);
//       } else {
//         // Si no hay término de búsqueda, simplemente limitamos
//         q = query(ref, limit(pageLimit ?? 10));
//       }

//       const unsub = onSnapshot(
//         q,
//         (snapshot) =>
//           next({
//             list:
//               snapshot.docs.length === 0
//                 ? null
//                 : snapshot.docs.map((snap) => snap.data()),
//             lastSnapDoc:
//               snapshot.docs.length === 0
//                 ? null
//                 : snapshot.docs[snapshot.docs.length - 1],
//           }),

//         (err) => next(err, null),
//       );
//       return () => unsub();
//     },
//   );

//   return {
//     data: data?.list,
//     lastSnapDoc: data?.lastSnapDoc,
//     error: error?.message,
//     isLoading: data === undefined,
//   };
// }

export const getProducts = async ({ id }) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export function useProduct({ productId }) {
  const { data, error } = useSWRSubscription(
    ["products", productId],
    ([path, productId], { next }) => {
      const ref = doc(db, `${path}/${productId}`);

      const unsub = onSnapshot(
        ref,
        (snapshot) => next(null, snapshot.data()),
        (err) => next(err, null),
      );
      return () => unsub();
    },
  );

  return {
    data: data,
    error: error?.message,
    isLoading: !data && !error,
  };
}
