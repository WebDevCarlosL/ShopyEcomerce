import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getCollections = async () => {
  const list = await getDocs(collection(db, "collections"));
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: data?.id,
      image: data?.image,
      name: data?.name,
      products: data?.products,
      subTitle: data?.subTitle,
      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),
    };
  });
};

export const getCollection = async ({ id }) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};
