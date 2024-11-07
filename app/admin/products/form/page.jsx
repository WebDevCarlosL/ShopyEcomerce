"use client";

import { useRef, useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import Description from "./components/Description";
import { Save } from "lucide-react";
import { toast } from "react-toastify";
import { createNewProduct } from "@/app/lib/firestore/products/write";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [data, setData] = useState(null);
  const [featureImage, setFeatureImage] = useState("");
  const [imageList, setImageList] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);

  const router = useRouter();

  const handleData = (key, value) => {
    setData((prevData) => {
      return {
        ...(prevData ?? {}),
        [key]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setFeatureImage("");
      setImageList([]);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Hubo un error", error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-semibold">Crear Nuevo Producto</h1>
        <button
          className="curso-pointer flex items-center gap-2 rounded-lg bg-[#313131] px-4 py-2 text-sm text-white transition-all duration-300 ease-soft-spring hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/20"
          disabled={loading}
        >
          {loading ? <CircularProgress /> : <Save />}
          {loading ? "Guardando..." : "Guardar"}
        </button>
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
