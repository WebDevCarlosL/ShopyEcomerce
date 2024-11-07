"use client";
import { useEffect } from "react";
import AuthContextProvider, { useAuth } from "../context/AuthContext";
import AdminLayout from "./components/AdminLayout";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";

const Layout = ({ children }) => {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  );
};

export default Layout;

function AdminChecking({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1>No estas logueado...</h1>
      </div>
    );
  }
  return <AdminLayout>{children}</AdminLayout>;
}
