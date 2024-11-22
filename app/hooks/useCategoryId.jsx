import useSWR from "swr";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const fetchCategory = async (id) => {
  const data = await getDoc(doc(db, `categories/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    return null;
  }
};

// const fetchCategory = async (categoryId) => {
//   try {
//     const data = await getDoc(doc(db, `categories/${categoryId}`));
//     if (data.exists()) {
//       return data.data();
//     } else {
//       throw new Error("Categoría no encontrada");
//     }
//   } catch (error) {
//     console.error("Error al obtener la categoría:", error); // Log para depuración
//     throw error; // Vuelve a lanzar el error para que sea capturado por SWR
//   }
// };

export const useCategory = (categoryId) => {
  const { data, error } = useSWR(
    categoryId ? [`categories/${categoryId}`] : null,
    () => fetchCategory(categoryId),
  );

  return {
    category: data,
    isLoading: !error && !data,
    isError: error,
  };
};
