"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@nextui-org/button";
import { Layers3 } from "lucide-react";

import Input from "../../../components/Input";

import { createNewAdmin, updateAdmin } from "@/app/lib/firestore/admins/write";
import { getAdmins } from "@/app/lib/firestore/admins/read";
import { uploadImageToCloudinary } from "../../../helpers/Cloudinary";

import { toast } from "react-toastify";

const Form = () => {
  const [image, setImage] = useState(null);

  const imageInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const [nameAdmin, setNameAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const fetchData = async () => {
    try {
      const response = await getAdmins({ id: id });
      setExistingImage(response?.image);
      setNameAdmin(response?.name);
      setEmailAdmin(response?.email);

      if (!response) {
        toast.error("Admin no encontrada");
        return;
      }
    } catch (error) {
      toast.error(error?.meesage);
    }
  };

  useEffect(() => {
    if (id) {
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

    if (nameAdmin.trim() === "") {
      toast.error("Por favor, rellene el campo Nombre.");
      setIsLoading(false);
    }

    if (emailAdmin.trim() === "") {
      toast.error("Por favor, rellene el campo email.");
      setIsLoading(false);
    }

    try {
      const { imageUrl } = await uploadImageToCloudinary(image);

      await createNewAdmin({
        nameAdmin,
        emailAdmin,
        image: imageUrl,
      });
      toast.success("Admin creado con exito");

      setEmailAdmin("");
      setNameAdmin("");
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

    if (!nameAdmin) {
      toast.error("Por favor, rellene el campo name.");
      setIsLoading(false);
      return;
    }

    if (!emailAdmin) {
      toast.error("Por favor, rellene el campo email.");
      setIsLoading(false);
      return;
    }

    let imageUrl = existingImage;

    if (!imageUrl) {
      setIsLoading(false);
      toast.error("Por favor, coloque una imagen.");
    }

    try {
      if (image) {
        const { imageUrl: newImageUrl, publicId } =
          await uploadImageToCloudinary(image);

        imageUrl = newImageUrl;
      }

      await updateAdmin({
        id,
        nameAdmin,
        emailAdmin,
        image: imageUrl,
      });
      toast.success("Admin actualizado con exito");
      setNameAdmin("");
      setEmailAdmin("");
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      router.push("/admin/admins");
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
      <h1 className="font-bold">{id ? "Actualizar " : "Crear "} Admins</h1>
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
                alt={nameAdmin}
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
          <label className="text-sm text-gray-500" htmlFor="nameAdmin">
            Nombre <span className="text-red-500">*</span>
          </label>
          <Input
            value={nameAdmin}
            onChange={(e) => setNameAdmin(e.target.value)}
            type={"text"}
            name={"nameAdmin"}
            id={"nameAdmin"}
            placeholder={"Nombre del admin"}
            icon={<Layers3 className="h-5 w-5" />}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500" htmlFor="emailAdmin">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            value={emailAdmin}
            onChange={(e) => setEmailAdmin(e.target.value)}
            type={"text"}
            name={"emailAdmin"}
            id={"emailAdmin"}
            placeholder={"Email del admin"}
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
                ? "Actualizar Admin"
                : "Crear Admin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
