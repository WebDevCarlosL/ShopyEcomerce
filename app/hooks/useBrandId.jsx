import useSWR from "swr";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const fetchBrand = async (id) => {
  const data = await getDoc(doc(db, `brands/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

export const useBrand = (brandId) => {
  const { data, error } = useSWR(
    brandId ? [`categories/${brandId}`] : null,
    () => fetchBrand(brandId),
  );

  return {
    brand: data,
    isLoading: !error && !data,
    isError: error,
  };
};
