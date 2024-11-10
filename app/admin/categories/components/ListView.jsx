"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { extractPublicId } from "@/app/helpers/Cloudinary";
import { DeleteImagenCloudinary } from "@/app/helpers/DeleteCloudinary";
import { useCategories } from "@/app/lib/firestore/categories/read";
import { deleteCategory } from "@/app/lib/firestore/categories/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ListView = () => {
  const { data, error, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl md:px-0 md:pr-5">
      <h1 className="text-xl">Lista de Categorias</h1>
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="rounded-l-lg border-y border-l bg-white px-3 py-2 font-semibold">
              Sn
            </th>
            <th className="border-y bg-white px-3 py-2 font-semibold">Image</th>
            <th className="border-y bg-white px-3 py-2 text-left font-semibold">
              Name
            </th>
            <th className="rounded-r-lg border-y border-r bg-white px-3 py-2 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <h1>No hay Categorías</h1>
          ) : (
            data?.map((item, index) => (
              <Row key={item?.id} item={item} index={index} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(false);

    try {
      setIsDeleting(true);
      const publicId = await extractPublicId(item?.image);
      await DeleteImagenCloudinary(publicId);
      await deleteCategory({ id: item?.id });
      toast.success("Categoria Eliminada");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/categories?id=${item?.id}`);
  };

  return (
    <>
      <tr key={index + 1}>
        <td className="rounded-l-lg border-y border-l bg-white px-3 py-2 text-center">
          {index + 1}
        </td>
        <td className="border-y bg-white px-3 py-2">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 object-cover"
              src={item?.image}
              alt={item?.name || "image"}
            />
          </div>
        </td>
        <td className="border-y bg-white px-3 py-2">{item?.name}</td>
        <td className="rounded-r-lg border-y border-r bg-white px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={handleUpdate}
              isIconOnly
              size="sm"
              isDisabled={isDeleting}
            >
              <Edit2 size={10} />
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              // onClick={handleDelete}
              isDisabled={isDeleting}
              isLoading={isDeleting}
              isIconOnly
              size="sm"
              color="danger"
            >
              <Trash2 size={10} />
            </Button>
          </div>
        </td>
      </tr>
      {/* Modal de confirmación */}
      <DeleteButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        label={"la categoria"}
      />
    </>
  );
}
