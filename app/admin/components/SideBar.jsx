"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "react-toastify";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import {
  BookCopy,
  Cat,
  Glasses,
  Layers3,
  LayoutDashboard,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Shopy from "../../../public/register2.jpg";

const SideBar = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Categories",
      link: "/admin/categories",
      icon: <Cat className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Brands",
      link: "/admin/brands",
      icon: <Glasses className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: 6,
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      id: 7,
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      id: 8,
      name: "Collections",
      link: "/admin/collections",
      icon: <BookCopy className="h-5 w-5" />,
    },
    {
      id: 9,
      name: "Admin",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await toast.promise(signOut(auth), {
        loading: "Cerrando sesión...",
        success: "Sesion cerrada",
        error: "Error al cerrar sesión",
      });
    } catch (error) {
      toast.error("Error al cerrar sesión: " + error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="sticky top-0 flex h-screen w-[260px] flex-col justify-between gap-7 overflow-hidden border-r bg-white px-5 py-3">
        <div className="flex justify-center py-4">
          <Link className="cursor-pointer" href={"/"}>
            <img src={Shopy} alt="logo" className="h-12" />
          </Link>
        </div>
        <ul className="flex flex-1 flex-col gap-3 overflow-y-scroll scrollbar-hide">
          {menuList.map((menu) => (
            <Tab menu={menu} key={menu.id} />
          ))}
        </ul>
        <div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`flex items-center gap-2 px-3 py-1 font-bold ${
              loading ? "bg-gray-400" : "hover:bg-red-500"
            } w-full justify-center rounded-xl transition-all duration-300 ease-soft-spring hover:font-bold hover:text-white`}
          >
            <LogOut className="h-5 w-5" />
            {loading ? "Cerrando sesión..." : "Logout"}
          </button>
        </div>
      </section>
    </>
  );
};

export default SideBar;

function Tab({ menu }) {
  const pathname = usePathname();
  const isSelected = pathname === menu?.link;

  const handleLogout = () => {
    console.log("Cerrando sesión...");

    router.push("/");
  };

  return (
    <Link href={menu?.link}>
      <li
        className={`flex list-none items-center gap-2 rounded-xl px-4 py-2 font-semibold ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"} `}
      >
        {menu?.icon} {menu?.name}
      </li>
    </Link>
  );
}
