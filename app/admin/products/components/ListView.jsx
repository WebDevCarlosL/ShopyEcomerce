"use client";

import DeleteButton from "@/app/components/DeleteButton";
import { useProducts } from "@/app/lib/firestore/products/read";
import { deleteProduct } from "@/app/lib/firestore/products/write";

import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ListView = () => {
  const [pageLimit, setPageLimit] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [islastSnapDoc, setIsLastSnapDoc] = useState([]);
  const { data, error, isLoading, lastSnapDoc } = useProducts({
    pageLimit: pageLimit,

    lastSnapDoc:
      islastSnapDoc.length === 0
        ? null
        : islastSnapDoc[islastSnapDoc?.length - 1],
  });

  useEffect(() => {
    setIsLastSnapDoc([]);
  }, [pageLimit]);

  const handleNextPage = () => {
    let newStack = [...islastSnapDoc];
    newStack.push(lastSnapDoc);
    setIsLastSnapDoc(newStack);
  };

  const handlePrevPage = () => {
    let newStack = [...islastSnapDoc];
    newStack.pop(lastSnapDoc);
    setIsLastSnapDoc(newStack);
  };

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

  const filteredProducts = data?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex w-full flex-1 flex-col gap-3 overflow-x-auto rounded-xl md:px-0 md:pr-5">
      {data?.length === undefined ? (
        <p className="text-center font-bold text-red-700">No hay productos</p>
      ) : (
        <>
          <table className="border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="rounded-l-lg border-y border-l bg-white px-3 py-2 font-semibold">
                  Sn
                </th>
                <th className="border-y bg-white px-3 py-2 font-semibold">
                  Imagen
                </th>
                <th className="border-y bg-white px-3 py-2 text-left font-semibold">
                  Titulo
                </th>
                <th className="border-y bg-white px-3 py-2 text-left font-semibold">
                  Precio
                </th>
                <th className="border-y bg-white px-3 py-2 text-left font-semibold">
                  Stock
                </th>
                <th className="border-y bg-white px-3 py-2 text-left font-semibold">
                  Orders
                </th>
                <th className="border-y bg-white px-3 py-2 text-left font-semibold">
                  Status
                </th>
                <th className="rounded-r-lg border-y border-r bg-white px-3 py-2 font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <Row
                  key={item?.id}
                  item={item}
                  index={index + islastSnapDoc.length * pageLimit}
                />
              ))}
            </tbody>
          </table>
        </>
      )}

      <div className="flex justify-between py-3 text-sm">
        <Button
          isDisabled={isLoading || data?.length === 0}
          onClick={handlePrevPage}
          size="sm"
          variant="bordered"
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(e.target.value)}
          className="rounded-xl px-5"
          name="pageLimit"
          id="pageLimit"
        >
          <option value={3}>3 items</option>
          <option value={5}>5 items</option>
          <option value={10}>10 items</option>
          <option value={20}>20 items</option>
          <option value={100}>100 items</option>
        </select>
        <Button
          isDisabled={isLoading || data?.length === undefined}
          onClick={handleNextPage}
          size="sm"
          variant="bordered"
        >
          Next
        </Button>
      </div>
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
      await deleteProduct({ id: item?.id });
      toast.success("Producto Eliminado");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/products?id=${item?.id}`);
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
              src={item?.image?.imageUrl}
              alt={item?.name || "image"}
            />
          </div>
        </td>
        <td className="whitespace-nowrap border-y bg-white px-3 py-2">
          {item?.name}
        </td>
        <td className="whitespace-nowrap border-y bg-white px-3 py-2">
          {item?.saleprice < item?.price && (
            <span className="text-xs text-gray-500 line-through">
              ${item?.price}
            </span>
          )}
          {""}
          {""}${item?.saleprice}
        </td>
        <td className="border-y bg-white px-3 py-2">{item?.stock}</td>
        <td className="border-y bg-white px-3 py-2">{item?.orders ?? 0}</td>
        <td className="border-y bg-white px-3 py-2">
          <div className="flex">
            {item?.stock - (item?.orders ?? 0) > 0 && (
              <div className="rounded-md bg-green-100 px-2 py-1 text-center text-xs font-bold text-green-700">
                Disponible
              </div>
            )}
            {item?.stock - (item?.orders ?? 0) <= 0 && (
              <div className="rounded-md bg-red-100 px-2 py-1 text-center text-xs font-bold text-red-700">
                Agotado
              </div>
            )}
          </div>
        </td>
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
      />
    </>
  );
}
