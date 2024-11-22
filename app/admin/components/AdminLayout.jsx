"use client";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useAdmin } from "../../lib/firestore/admins/read";

import { CircularProgress } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);
  const pathname = usePathname();

  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  useEffect(() => {
    toggleSideBar();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sideBarRef.current && !sideBarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );

  if (!admin)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <h1 className="font-bold">No eres un admin...</h1>

        <h2 className="text-sm text-gray-600">{user?.email}</h2>
        <button
          onClick={async () => {
            await signOut(auth);
          }}
          className="rounded-md bg-black px-2 py-2 text-white"
        >
          Logout
        </button>
      </div>
    );

  return (
    <main className="relative flex">
      <div className="z-100 hidden md:block">
        <SideBar />
      </div>
      <div
        ref={sideBarRef}
        className={`fixed z-[100] transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-[260px]"
        }`}
      >
        <SideBar />
      </div>

      <section className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <div className="z-50">
          <Header toggleSideBar={toggleSideBar} />
        </div>
        <section className="flex-1 bg-[#eff3f4] pt-14">{children}</section>
      </section>
    </main>
  );
};

export default AdminLayout;
