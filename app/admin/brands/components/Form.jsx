"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@nextui-org/button";
import { Layers3 } from "lucide-react";

import Input from "../../../components/Input";

import { createNewBrand, updateBrand } from "@/app/lib/firestore/brands/write";
import { getBrands } from "@/app/lib/firestore/brands/read";
import { uploadImageToCloudinary } from "../../../helpers/Cloudinary";

import { toast } from "react-toastify";

const Form = () => {
  const [image, setImage] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const imageInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const [brand, setBrand] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const response = await getBrands({ id: id });
      setExistingImage(response?.image);
      setBrand(response?.name);

      if (!response) {
        toast.error("Marca no encontrada");
        return;
      }
    } catch (error) {
      toast.error(error?.meesage);
    }
  };

  useEffect(() => {
    if (id) {
      setBrand("");
      fetchData();
      setImage(null);
    }
  }, [id]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!image) {
      toast.error("Por favor, selecciona una imagen antes de continuar.");
      setIsLoading(false);
    }

    if (brand.trim() === "") {
      toast.error("Por favor, rellene el campo marca.");
      setIsLoading(false);
    }

    try {
      const { imageUrl, publicId } = await uploadImageToCloudinary(image);

      await createNewBrand({
        brand: brand,
        image: imageUrl,
        publicId,
      });
      toast.success("Marca creada con exito");

      setBrand("");
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);

    if (!id) {
      toast.error("Debes de colocar un id");
      setIsLoading(false);
      return;
    }

    if (!brand) {
      toast.error("Por favor, rellene el campo marca.");
      setIsLoading(false);
      return;
    }

    let imageUrl = existingImage;

    if (!imageUrl) {
      setIsLoading(false);
      toast.error("Por favor, coloque una imagen imagen.");
    }

    try {
      if (image) {
        const { imageUrl: newImageUrl, publicId } =
          await uploadImageToCloudinary(image);
        setPublicId(publicId);
        imageUrl = newImageUrl;
      }

      await updateBrand({
        id,
        brand,
        image: imageUrl,
        publicId,
      });
      toast.success("Marca actualizada con exito");
      setBrand("");
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/brands");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 md:w-[400px]">
      <h1 className="font-bold">{id ? "Actualizar " : "Crear "} Marca</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          if (id) {
            handleUpdate();
          } else {
            handleSubmit();
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
                alt={brand}
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
          <label className="text-sm text-gray-500" htmlFor="brand">
            Nombre <span className="text-red-500">*</span>
          </label>
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            type={"text"}
            name={"brand"}
            id={"brand"}
            placeholder={"Nombre de la marca"}
            icon={<Layers3 className="h-5 w-5" />}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Button
            isLoading={isLoading}
            isdisabled={isLoading}
            type="submit"
            color="primary"
          >
            {isLoading
              ? "Guardando..."
              : id
                ? "Actualizar Marca"
                : "Crear Marca"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
