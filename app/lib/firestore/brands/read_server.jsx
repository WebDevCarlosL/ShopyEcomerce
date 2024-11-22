import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getBrands = async () => {
  const list = await getDocs(collection(db, "brands"));
  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      image: data?.image,
      name: data?.name,
      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),
    };
  });
};
