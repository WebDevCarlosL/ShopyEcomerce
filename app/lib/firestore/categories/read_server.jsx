import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getCategories = async () => {
  const list = await getDocs(collection(db, "categories"));
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: data?.id,
      image: data?.image,
      name: data?.name,
      slug: data?.slug,
      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),
    };
  });
};
