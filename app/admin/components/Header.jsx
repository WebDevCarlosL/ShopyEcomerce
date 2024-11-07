"use client";

import { Menu } from "lucide-react";
import React from "react";

const Header = ({ toggleSideBar }) => {
  return (
    <section className="fixed top-0 flex w-full items-center gap-3 border-b bg-white px-4 py-4">
      <div className="flex items-center justify-center md:hidden">
        <button onClick={toggleSideBar}>
          <Menu />
        </button>
      </div>
      <h1 className="text-xl font-semibold">DashBoard</h1>
    </section>
  );
};

export default Header;
