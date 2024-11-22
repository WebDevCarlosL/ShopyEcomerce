import Link from "next/link";

import { Heart, Search, ShoppingCart, User, UserCircle } from "lucide-react";
import LogoutButton from "./LogoutButton";
import AuthContextProvider from "../context/AuthContext";
import HeaderClientButton from "./HeaderClientButton";

const menuList = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "About",
    link: "/about",
  },
  {
    id: 3,
    name: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white bg-opacity-65 px-7 py-2 backdrop-blur-2xl md:px-14 md:py-2">
      <Link className="cursor-pointer" href={"/"}>
        <img src="/shopy.svg" alt="Logo" className="h-[40px]" />
      </Link>
      <div className="hidden items-center gap-2 font-bold md:flex">
        {menuList.map((menu) => (
          <Link href={menu.link} key={menu.id}>
            <button className="rounded-lg px-4 py-2 text-sm hover:bg-gray-50">
              {menu.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Link href={"/search"}>
          <button
            title="Search Products"
            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-50"
          >
            <Search size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <HeaderClientButton />
        </AuthContextProvider>

        <Link href={"/account"}>
          <button
            title="Account"
            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-50"
          >
            <UserCircle size={14} />
          </button>
        </Link>
        <AuthContextProvider>
          <LogoutButton />
        </AuthContextProvider>
      </div>
    </nav>
  );
};

export default Header;

{
  /* <Link href={"/login"}>
<button className="rounded-md bg-indigo-600 px-2 py-2 font-bold text-white shadow-md shadow-black/20">
  Login
</button>
</Link> */
}
