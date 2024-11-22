"use client";

import { CopyPlus, NotebookPen, PackageOpen, Receipt } from "lucide-react";
import Input from "../../components/ui/Input";
import { useBrands } from "@/app/lib/firestore/brands/read";
import { useCategories } from "@/app/lib/firestore/categories/read";

const BasicDetails = ({ data, handleData }) => {
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  return (
    <section className="flex flex-1 flex-col gap-2 rounded-xl border bg-white p-4 shadow-lg shadow-black/20">
      <h2 className="font-semibold">Detalles Basicos</h2>
      <Input
        value={data?.name ?? ""}
        onChange={(e) => {
          handleData("name", e.target.value);
        }}
        label="Nombre Producto"
        placeholder="Ingrese el nombre del producto"
        type="text"
        name="name"
        id="name"
        htmlfor="name"
        icon={<PackageOpen className="h-5 w-5" />}
      />
      <Input
        value={data?.shortdescription ?? ""}
        onChange={(e) => {
          handleData("shortdescription", e.target.value);
        }}
        label="Descripcion Producto"
        placeholder="Ingrese la descripción del producto"
        type="text"
        name="description"
        id="description"
        htmlfor="description"
        icon={<NotebookPen className="h-5 w-5" />}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="brand" className="text-xs text-gray-500">
          Marca
          <span className="text-red-500">*</span>
        </label>
        <select
          name="brand"
          id="brand"
          value={data?.brandId ?? ""}
          onChange={(e) => {
            handleData("brandId", e.target.value);
          }}
          className="w-full rounded-lg border px-4 py-2 outline-none"
          required
        >
          <option value={""}>Seleccione una Marca</option>
          {brands?.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-xs text-gray-500">
          Categoria
          <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          id="category"
          value={data?.categoryId ?? ""}
          onChange={(e) => {
            handleData("categoryId", e.target.value);
          }}
          className="w-full rounded-lg border px-4 py-2 outline-none"
          required
        >
          <option value={""}>Seleccione una Categoria</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        value={data?.stock ?? ""}
        onChange={(e) => {
          handleData("stock", e.target.valueAsNumber);
        }}
        label="Stock del Producto"
        placeholder="Ingrese el stock del producto"
        type="number"
        name="stock"
        id="stock"
        htmlfor="stock"
        icon={<CopyPlus className="h-5 w-5" />}
      />

      <Input
        value={data?.price ?? ""}
        onChange={(e) => {
          handleData("price", e.target.valueAsNumber);
        }}
        label="Precio del Producto"
        type="number"
        name="price"
        id="price"
        htmlfor="price"
        icon={<Receipt className="h-5 w-5" />}
      />

      <Input
        value={data?.saleprice ?? ""}
        onChange={(e) => {
          handleData("saleprice", e.target.valueAsNumber);
        }}
        label="Precio final del Producto"
        type="number"
        name="saleprice"
        id="saleprice"
        htmlfor="saleprice"
        icon={<Receipt className="h-5 w-5" />}
      />

      <div className="mt-2 flex flex-col gap-1">
        <label className="text-xs text-gray-500" htmlFor="isFeatured">
          "Is Featured Product"
          <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-2">
          <select
            value={data?.isFeatured ? "yes" : "no"}
            onChange={(e) =>
              handleData("isFeatured", e.target.value === "yes" ? true : false)
            }
            type={"text"}
            name={"isFeatured"}
            id={"isFeatured"}
            className="w-full rounded-lg border py-2 outline-none"
          >
            <option value={"no"}>No</option>
            <option value={"yes"}>Yes</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default BasicDetails;
