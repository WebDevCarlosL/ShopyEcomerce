"use client";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { usePathname } from "next/navigation";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef(null);

  const pathname = usePathname();

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
