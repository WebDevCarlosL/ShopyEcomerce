"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@nextui-org/button";
import { Layers3 } from "lucide-react";

import Input from "../../../components/Input";
import { toast } from "react-toastify";
import {
  createNewCategory,
  updateCategory,
} from "@/app/lib/firestore/categories/write";

import { getCategory } from "@/app/lib/firestore/categories/read";
import {
  deleteImageFromCloudinary,
  extractPublicId,
  uploadImageToCloudinary,
} from "../../../helpers/Cloudinary";
import { DeleteImagenCloudinary } from "@/app/helpers/DeleteCloudinary";

const Form = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [existingImage, setExistingImage] = useState("");

  const searchParams = useSearchParams();
  const imageInputRef = useRef(null);
  const router = useRouter();

  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const response = await getCategory({ id: id });

      if (!response) {
        toast.error("Categoria no encontrada");
        return;
      } else {
        setCategory(response?.name);
        setSlug(response?.slug);
        setExistingImage(response?.image);
      }
    } catch (error) {
      toast.error(error?.meesage);
    }
  };

  useEffect(() => {
    if (id) {
      setCategory("");
      setSlug("");
      fetchData();
      setImage(null);
    }
  }, [id]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (!image) {
      toast.error("Por favor, selecciona una imagen antes de continuar.");
      setIsLoading(false);
      return;
    }

    if (category.trim() === "") {
      toast.error("Por favor, rellene el campo categoria.");
      setIsLoading(false);
      return;
    }
    if (slug.trim() === "") {
      toast.error("Por favor, rellene el campo slug.");
      setIsLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary(image);

      await createNewCategory({
        category: category,
        slug: slug,
        image: imageUrl,
      });
      toast.success("Categoria creada con exito");

      setCategory("");
      setSlug("");
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
    if (!slug) {
      toast.error("Por favor, rellene el campo slug.");
      setIsLoading(false);
      return;
    }
    if (!category) {
      toast.error("Por favor, rellene el campo categoria.");
      setIsLoading(false);
      return;
    }

    let imageUrl = existingImage;

    if (!imageUrl) {
      toast.error("Por favor, coloque una imagen imagen.");
      setIsLoading(false);
      return;
    }

    try {
      if (image) {
        const publicId = await extractPublicId(existingImage);
        await DeleteImagenCloudinary(publicId);
        const newImageUrl = await uploadImageToCloudinary(image);
        imageUrl = newImageUrl;
      }
      await updateCategory({
        id,
        slug,
        category,
        image: imageUrl,
      });
      toast.success("Categoria actualizada con exito");
      setCategory("");
      setSlug("");
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/categories");
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

  const handleCancel = () => {
    setSlug("");
    setCategory("");
    setExistingImage("");
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-5 md:w-[400px]">
      <h1 className="font-bold">{id ? "Actualizar " : "Crear "} Categoria</h1>
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
                alt={category}
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
          <label className="text-sm text-gray-500" htmlFor="category">
            Nombre <span className="text-red-500">*</span>
          </label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type={"text"}
            name={"category"}
            id={"category"}
            placeholder={"Nombre de la categoria"}
            icon={<Layers3 className="h-5 w-5" />}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="Slug">
            Slug <span className="text-red-500">*</span>
          </label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type={"text"}
            name={"Slug"}
            id={"Slug"}
            placeholder={"Coloque Unidad"}
            icon={<Layers3 className="h-5 w-5" />}
          />
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
        </div>
      </form>
    </div>
  );
};

export default Form;
