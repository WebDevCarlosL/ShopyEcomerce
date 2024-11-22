import useSWR from "swr";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Asegúrate de que esta ruta sea correcta

// Función para obtener los datos del producto
const fetchCollection = async (id) => {
  const data = await getDoc(doc(db, `collections/${id}`));
  if (data.exists()) {
    return data.data();
  } else {
    throw new Error("Coleccion no encontrada");
  }
};

// Hook personalizado para obtener el Collectiono
export const useCollectionId = (id) => {
  const { data, error } = useSWR(id ? [`collections/${id}`] : null, () =>
    fetchCollection(id),
  );

  return {
    collection: data,
    isLoading: !error && !data,
    isError: error,
  };
};
