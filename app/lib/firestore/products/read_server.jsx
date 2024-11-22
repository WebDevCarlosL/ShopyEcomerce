import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getFeaturedProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), where("isFeatured", "==", true)),
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: data?.id,
      name: data?.name,
      shortdescription: data?.shortdescription,
      image: data?.image,

      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),

      price: data?.price,
      saleprice: data?.saleprice,
    };
  });
};

export const getProducts = async () => {
  const list = await getDocs(
    query(collection(db, "products"), orderBy("timestampCreated", "desc")),
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: data?.id,
      name: data?.name,
      shortdescription: data?.shortdescription,
      image: data?.image,

      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),

      price: data?.price,
      saleprice: data?.saleprice,
    };
  });
};

export const getProductsByCategory = async ({ categoryId }) => {
  if (!categoryId) {
    console.error("categoryId is required");
  }

  const list = await getDocs(
    query(
      collection(db, "products"),
      orderBy("timestampCreated", "desc"),
      where("categoryId", "==", categoryId),
    ),
  );

  return list.docs.map((snap) => {
    const data = snap.data();
    return {
      id: data?.id,
      name: data?.name,
      shortdescription: data?.shortdescription,
      image: data?.image,

      timestampUpdated: data?.timestampUpdated?.seconds.toString(),
      timestampCreated: data?.timestampCreated?.seconds.toString(),

      price: data?.price,
      saleprice: data?.saleprice,
    };
  });
};

export const getProduct = async ({ id }) => {
  const data = await getDocs(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};
