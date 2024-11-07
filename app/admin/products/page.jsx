"use client";

import { List, Plus } from "lucide-react";
import Link from "next/link";
import ListView from "./components/ListView";

const Page = () => {
  return (
    <main className="flex flex-col gap-4 p-3 pt-5">
      <div className="flex items-center justify-between">
        <h1>Lista de Productos</h1>
        <Link href={"/admin/products/form"}>
          <button className="flex items-center gap-2 rounded-lg bg-[#313131] px-4 py-2 text-sm text-white transition-all duration-300 ease-soft-spring hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black/20">
            <Plus />
            Crear
          </button>
        </Link>
      </div>
      <ListView />
    </main>
  );
};

export default Page;
