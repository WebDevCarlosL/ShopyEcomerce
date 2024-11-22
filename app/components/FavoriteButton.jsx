"use client";

import { useState } from "react";

import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../lib/firestore/user/read";

import { updateToFavorites } from "../lib/firestore/user/write";

import { Button } from "@nextui-org/button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

const FavoriteButton = ({ productId }) => {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      if (!user?.uid) {
        router.push("/login");
        throw new Error("Debes de estar logueado");
      }
      if (data?.favorites?.includes(productId)) {
        const newList = data?.favorites?.filter((item) => item != productId);
        await updateToFavorites({ list: newList, uid: user?.uid });
        toast.success("Producto removido de tus favoritos.");
      } else {
        await updateToFavorites({
          list: [...(data?.favorites ?? []), productId],
          uid: user?.uid,
        });
        toast.success("Producto agregado a tus favoritos.");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = data?.favorites?.includes(productId);

  return (
    <div>
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={handleClick}
        variant="light"
        color="danger"
        className="rounded-full"
        isIconOnly
        size="sm"
      >
        {!isFavorite && <FavoriteBorderOutlinedIcon fontsieze="small" />}
        {isFavorite && <FavoriteIcon fontsieze="small" />}
      </Button>
    </div>
  );
};

export default FavoriteButton;
