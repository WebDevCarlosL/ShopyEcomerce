"use client";

import React from "react";
import Form from "./components/Form";
import ListView from "./components/ListView";

const Page = () => {
  return (
    <main className="flex flex-col gap-5 p-5 md:flex-row">
      <Form />
      <ListView />
    </main>
  );
};

export default Page;
