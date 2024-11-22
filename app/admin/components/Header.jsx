"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useAdmin } from "@/app/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";
import React from "react";

const Header = ({ toggleSideBar }) => {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });
  return (
    <section className="fixed top-0 flex w-full items-center gap-3 border-b bg-white px-4 py-2">
      <div className="flex items-center justify-center md:hidden">
        <button onClick={toggleSideBar}>
          <Menu />
        </button>
      </div>
      <div className="flex w-full items-center justify-between pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold">DashBoard</h1>
        <div className="flex items-center">
          <div className="hidden flex-col items-end md:flex">
            <p className="text-sm font-semibold">{admin?.name}</p>
            <span className="text-xs text-gray-600">{admin?.email}</span>
          </div>
          <Avatar size="sm" src={admin?.image} />
        </div>
      </div>
    </section>
  );
};

export default Header;
