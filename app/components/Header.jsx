import Link from "next/link";

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
    <nav className="py-4 px-14 border-b flex  items-center justify-between">
      <img src="shopy.svg" alt="" className="h-[40px]" />
      <div className="flex gap-4 items-center font-bold">
        {menuList.map((menu) => (
          <Link href={menu.link} key={menu.id}>
            <button>{menu.name}</button>
          </Link>
        ))}
      </div>
      <Link href={"/login"}>
        <button className="bg-indigo-600  text-white px-2 py-2 rounded-md  shadow-md shadow-black/20 font-bold">
          Login
        </button>
      </Link>
    </nav>
  );
};

export default Header;
