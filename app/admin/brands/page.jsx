"use client";
import React, { useState } from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";

const Page = () => {
  const [viewForm, setViewForm] = useState(false);

  return (
    <main className="flex flex-col gap-5 p-5 md:flex-row">
      <button
        type="button"
        className="mx-10 rounded-md bg-indigo-700 p-2 font-bold uppercase text-white md:hidden"
        onClick={() => setViewForm(!viewForm)}
      >
        {viewForm ? "Ocultar Formulario " : "Mostrar Formulario"}
      </button>
      <div className={`${viewForm ? "block" : "hidden"} md:block`}>
        <Form />
      </div>

      <ListView />
    </main>
  );
};

export default Page;
