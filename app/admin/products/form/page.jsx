"use client";

import { useEffect, useRef, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import {
  createNewProduct,
  updateProduct,
} from "@/app/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "@/app/lib/firestore/products/read";
import {
  extractPublicId,
  uploadImageToCloudinary,
} from "@/app/helpers/Cloudinary";
import { DeleteImagenCloudinary } from "@/app/helpers/DeleteCloudinary";

const Page = () => {
  const [data, setData] = useState(null);
  const [featureImage, setFeatureImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const [existingImageList, setExistingImageList] = useState("");
  const imageInputRef = useRef(null);
  const router = useRouter();

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const fechtData = async () => {
    try {
      const response = await getProducts({ id: id });
      if (!response) {
        toast.error("No se pudo obtener el producto");
        return;
      } else {
        setData(response);
        setExistingImage(response?.image);
        setExistingImageList(response?.imageList);
      }
    } catch (error) {
      toast.error(error?.meesage);
    }
  };

  useEffect(() => {
    if (id) {
      fechtData();
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

  const handleCreate = async () => {
    if (
      !data ||
      !data.name ||
      !data.shortdescription ||
      !data.brandId ||
      !data.categoryId ||
      !data.stock ||
      !data.price ||
      !data.saleprice
    ) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (!featureImage) {
      toast.error("Ingrese una imagen destacada.");
      return;
    }

    if (!imageList || imageList.length === 0) {
      toast.error("Ingrese al menos una imagen adicional.");
      return;
    }

    setLoading(true);

    try {
      await createNewProduct({
        data: data,
        featureImage: featureImage,
        imageList: imageList,
      });
      toast.success("Producto Guardado");
      setData(null);
      setFeatureImage(null);
      setImageList([]);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/products");
    } catch (error) {
      console.log("Hubo un error", error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (
      !data ||
      !data.name ||
      !data.shortdescription ||
      !data.brandId ||
      !data.categoryId ||
      !data.stock ||
      !data.price ||
      !data.saleprice
    ) {
      toast.error("Por favor, complete todos los campos requeridos.");
      return;
    }

    if (!id) {
      toast.error("El Id es requerido.");
      return;
    }

    let imageUrl = existingImage;

    let imageUrls = existingImageList;

    if (!imageUrl) {
      toast.error("Por favor, coloque una imagen destacada.");
      return;
    }

    if (imageUrls.length === 0) {
      toast.error("Ingrese al menos una imagen destacada adicional.");
      return;
    }

    if (featureImage) {
      imageUrl = await uploadImageToCloudinary(featureImage);
    }

    if (imageList && imageList.length > 0) {
      imageUrls = await Promise.all(
        imageList.map(async (image) => {
          return await uploadImageToCloudinary(image);
        }),
      );
    }

    try {
      setLoading(true);
      if (featureImage) {
        const publicId = await extractPublicId(existingImage);
        await DeleteImagenCloudinary(publicId);
        const newImageUrl = await uploadImageToCloudinary(featureImage);
        imageUrl = newImageUrl;
      }

      await updateProduct({
        id,
        data: data,
        featureImage: imageUrl,
        imageList: imageUrls,
      });
      toast.success("Producto Actualizado");
      setData(null);
      setFeatureImage("");
      setImageList([]);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/products");
    } catch (error) {
      console.log("Hubo un error", error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (id) {
          handleUpdate();
        } else {
          handleCreate();
        }
      }}
      className="flex flex-col gap-4 p-5"
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold">
          {id ? "Actualizar" : "Crear"} Producto
        </h1>
        <div className="flex gap-2">
          <button
            className="curso-pointer flex items-center gap-2 rounded-lg bg-[#313131] px-4 py-2 text-sm text-white transition-all duration-300 ease-soft-spring hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/20"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : <Save />}
            {loading ? "Guardando..." : id ? "Actualizar" : "Guardar"}
          </button>
          {id && (
            <Button
              isLoading={loading}
              isdisabled={loading}
              type="button"
              onClick={() => {
                router.push("/admin/products");
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex flex-1 flex-col gap-3">
          <button
            type="button"
            className="mx-10 rounded-md bg-indigo-700 p-2 font-bold uppercase text-white md:hidden"
            onClick={() => setViewForm(!viewForm)}
          >
            {viewForm ? "Ocultar Formulario " : "Mostrar Formulario"}
          </button>
          <div className={`${viewForm ? "block" : "hidden"} md:block`}>
            <BasicDetails
              data={data}
              handleData={handleData}
              imageList={imageList}
              setImageList={setImageList}
            />
          </div>
        </div>
        <div className="flex h-full flex-1 flex-col gap-5">
          <Images
            data={data}
            featureImage={featureImage}
            setFeatureImage={setFeatureImage}
            imageList={imageList}
            setImageList={setImageList}
            ref={imageInputRef}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
    </form>
  );
};

export default Page;
