"use client";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="p-10 bg-red-100">
      <h1>Dashboard</h1>
      <Link href={"/admin"}>Admin Panel</Link>
    </main>
  );
};

export default Page;
