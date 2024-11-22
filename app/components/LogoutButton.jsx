"use client";

import { toast } from "react-toastify";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { user } = useAuth();

  if (!user) {
    return <></>;
  }

  const handleLogout = async () => {
    try {
      await toast.promise(signOut(auth), {
        loading: "Cerrando sesión...",
        success: "Sesion cerrada",
        error: "Error al cerrar sesión",
      });
    } catch (error) {
      toast.error("Error al cerrar sesión: " + error?.message);
    } finally {
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-gray-50"
    >
      <LogOut size={14} />
    </button>
  );
};

export default LogoutButton;
