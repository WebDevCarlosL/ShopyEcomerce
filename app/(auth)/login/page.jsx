"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/account");
      toast.success("Login Successful");
    }
  }, [user]);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-10 md:p-24">
      <section className="flex flex-col gap-2">
        <div className="flex justify-center">
          <img className="h-20" src="shopy.svg" alt="imagen"></img>
        </div>
        <div className="flex min-w-[320px] flex-col gap-3 rounded-xl bg-white p-10 shadow-md shadow-black/20">
          <h1 className="text-center text-xl font-bold">Login with Email</h1>
          <form className="flex w-full flex-col gap-3 md:w-[320px]">
            <input
              type="text"
              name="email"
              id="email"
              className="w-full rounded-md border border-gray-300 p-2 px-3 focus:outline-none"
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded-md border border-gray-300 p-2 px-3 focus:outline-none"
              placeholder="Enter Your Password"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className="flex justify-between gap-2 text-sm font-semibold text-indigo-600">
            <Link href="/signup">
              <button className="hover:underline">New? Create Account</button>
            </Link>
            <Link href="/forget-password">
              <button className="hover:underline">Forgot Password</button>
            </Link>
          </div>
          <hr />
          <SignInGoogle />
        </div>
      </section>
    </main>
  );
};

export default Page;

function SignInGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Button isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
      Sign In With Google
    </Button>
  );
}
