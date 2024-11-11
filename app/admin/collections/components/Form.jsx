"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@nextui-org/button";
import { Layers3, X } from "lucide-react";

import Input from "../../../components/Input";
import { toast } from "react-toastify";
import {
  createNewCollections,
  updateCollections,
} from "@/app/lib/firestore/collections/write";

import { getCollections } from "@/app/lib/firestore/collections/read";
import {
  extractPublicId,
  uploadImageToCloudinary,
} from "../../../helpers/Cloudinary";
import { DeleteImagenCloudinary } from "@/app/helpers/DeleteCloudinary";
import { useProduct, useProducts } from "@/app/lib/firestore/products/read";

const Form = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: products } = useProducts({ pageLimit: 2000 });

  const searchParams = useSearchParams();
  const imageInputRef = useRef(null);
  const router = useRouter();
  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const response = await getCollections({ id: id });

      if (!response) {
        toast.error("Colecciones no encontrada");
        return;
      } else {
        setData(response);
        setExistingImage(response?.image);
      }
    } catch (error) {
      toast.error(error?.meesage);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key, value) => {
    setData((prevData) => {
      return {
        ...(prevData ?? {}),
        [key]: value,
      };
    });
  };

  console.log(image);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = async () => {
    if (!image) {
      toast.error("Ingrese una imagen destacada");
      return;
    }

    if (!data?.name) {
      toast.error("Ingrese el titulo de la coleccion");
      return;
    }

    if (!data?.subTitle) {
      toast.error("Ingrese el subtitulo de la coleccion");
      return;
    }

    if (!data?.products || data?.products.length === 0) {
      toast.error("Ingrese al menos un producto a la coleccion");
      return;
    }
    setIsLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(image);
      await createNewCollections({
        data,
        image: imageUrl,
      });
      toast.success("Producto Guardado");
      setData(null);
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Hubo un error", error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!data.name || !data.image) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (!id) {
      toast.error("El Id es requerido.");
      return;
    }

    let imageUrl = existingImage;

    if (!imageUrl) {
      toast.error("Por favor, coloque una imagen destacada.");
      return;
    }

    setIsLoading(true);

    try {
      if (image) {
        const publicId = await extractPublicId(existingImage);
        await DeleteImagenCloudinary(publicId);
        const newImageUrl = await uploadImageToCloudinary(image);
        imageUrl = newImageUrl;
      }
      await updateCollections({
        id,
        data,
        image: imageUrl,
      });
      toast.success("Colecciones Actualizada");
      setData(null);
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/collections");
    } catch (error) {
      console.log("Hubo un error", error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setData(null);
    setExistingImage("");
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
    router.push("/admin/collections");
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 md:w-[400px]">
      <h1 className="font-bold">{id ? "Actualizar " : "Crear "} Coleccion</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="image">
            Imagen <span className="text-red-500">*</span>
          </label>
          {image && (
            <div className="flex items-center justify-center p-3">
              <img
                className="h-[80px] w-[80px]"
                src={URL.createObjectURL(image)}
                alt={"image"}
              />
            </div>
          )}
          <input
            onChange={handleImageChange}
            accept="image/jpeg,image/png,image/svg+xml"
            type="file"
            name="image"
            id="image"
            ref={imageInputRef}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="title">
            Titulo <span className="text-red-500">*</span>
          </label>
          <Input
            value={data?.name ?? ""}
            onChange={(e) => {
              handleData("name", e.target.value);
            }}
            type={"text"}
            name={"name"}
            id={"name"}
            placeholder={"Titulo de la coleccion"}
            icon={<Layers3 className="h-5 w-5" />}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="subTitle">
            Sub Titulo <span className="text-red-500">*</span>
          </label>
          <Input
            value={data?.subTitle ?? ""}
            onChange={(e) => {
              handleData("subTitle", e.target.value);
            }}
            type={"text"}
            name={"subTitle"}
            id={"subTitle"}
            placeholder={"Sub Titulo de la coleccion"}
            icon={<Layers3 className="h-5 w-5" />}
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {data?.products?.map((productId) => {
            return (
              <ProductCard
                key={productId}
                productId={productId}
                setData={setData}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-500" htmlFor="select">
            Seleccionar Productos <span className="text-red-500">*</span>
          </label>
          <select
            className="mb-3"
            onChange={(e) => {
              e.preventDefault();
              setData((prevData) => {
                let list = [...(prevData?.products ?? [])];
                list.push(e.target.value);
                return {
                  ...prevData,
                  products: list,
                };
              });
            }}
            name={"select"}
            id={"select"}
            icon={<Layers3 className="h-5 w-5" />}
          >
            <option value="">Seleccionar Productos</option>
            {products?.map((product) => (
              <option
                disabled={data?.products?.includes(product.id)}
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <Button
          isLoading={isLoading}
          isdisabled={isLoading}
          type="submit"
          color="primary"
        >
          {isLoading
            ? "Guardando..."
            : id
              ? "Actualizar Categoria"
              : "Crear Categoria"}
        </Button>
        <Button
          isLoading={isLoading}
          isdisabled={isLoading}
          type="button"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </form>
    </div>
  );
};

export default Form;

function ProductCard({ productId, setData }) {
  const { data: product } = useProduct({ productId: productId });
  return (
    <div className="flex items-center gap-2 rounded-full bg-blue-500 px-4 py-1 text-sm text-white">
      <h2> {product?.name}</h2>
      <button
        onClick={() => {
          setData((prevData) => {
            let list = [...prevData?.products];
            list = list?.filter((item) => item != productId);
            return {
              ...prevData,
              products: list,
            };
          });
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}
