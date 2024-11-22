import useSWR from "swr";
import { getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Asegúrate de que esta ruta sea correcta

// Función para obtener los datos del producto
const fetchProduct = async (id) => {
  const data = await getDoc(doc(db, `products/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    throw new Error("Producto no encontrado");
  }
};

// Hook personalizado para obtener el producto
export const useProduct = (id) => {
  const { data, error } = useSWR(id ? [`products/${id}`] : null, () =>
    fetchProduct(id),
  );

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
};
