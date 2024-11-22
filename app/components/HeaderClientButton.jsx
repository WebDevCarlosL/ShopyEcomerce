"use client";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useUser } from "../lib/firestore/user/read";
import { useAuth } from "../context/AuthContext";
import { Badge } from "@nextui-org/react";

const HeaderClientButton = () => {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  return (
    <div className="flex items-center gap-2">
      <Link href={"/favorites"}>
        <Badge
          variant="solid"
          size="sm"
          className="bg-red-500 text-[8px] text-white"
          content={data?.favorites?.length ?? 0}
        >
          <button
            title="Favorites"
            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-50"
          >
            <Heart size={14} />
          </button>
        </Badge>
      </Link>
      <Link href={"/cart"}>
        <button
          title="Cart"
          className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-50"
        >
          <ShoppingCart size={14} />
        </button>
      </Link>
    </div>
  );
};

export default HeaderClientButton;
