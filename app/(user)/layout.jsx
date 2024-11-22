"use client";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthContextProvider, { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <AuthContextProvider>
        <UserChecking>
          <section className="flex-1">{children}</section>
        </UserChecking>
      </AuthContextProvider>
      <Footer />
    </main>
  );
};

export default Layout;

function UserChecking({ children }) {
  const { user, isLoading } = useAuth();
  console.log(user);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
        <h1>No estás logueado... </h1>
        <Link
          href={"/login"}
          className="cursor-pointer text-blue-500 underline"
        >
          Login
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}
