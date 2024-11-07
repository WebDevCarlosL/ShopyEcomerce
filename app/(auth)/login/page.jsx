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
      router.push("/dashboard");
      toast.success("Login Successful");
    }
  }, [user]);

  return (
    <main className="w-full flex items-center justify-center bg-gray-100 md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-2 ">
        <div className="flex justify-center ">
          <img className="h-20" src="shopy.svg" alt="imagen"></img>
        </div>
        <div className="bg-white p-10 rounded-xl shadow-md shadow-black/20 min-w-[320px] flex flex-col gap-3">
          <h1 className="font-bold text-xl text-center ">Login with Email</h1>
          <form className="flex flex-col gap-3 md:w-[320px] w-full">
            <input
              type="text"
              name="email"
              id="email"
              className="w-full px-3 p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Your Email"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 p-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter Your Password"
            />
            <Button color="primary">Login</Button>
          </form>
          <div className=" font-semibold flex justify-between text-indigo-600 text-sm gap-2">
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
      console.log(user);
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
