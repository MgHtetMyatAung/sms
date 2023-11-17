"use client";
import { AuthContext } from "@/context/AuthWrapper";
import React, { ReactNode, useContext, useLayoutEffect } from "react";
import SideBar from "./SideBar";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "./NavBar";

export default function LayoutControl({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuth } = useContext(AuthContext);
  console.log(isAuth, "auth");
  useLayoutEffect(() => {
    if (!isAuth && pathname !== "/login") {
      router.push("/login");
    }
  }, [pathname, isAuth]);
  return (
    <>
      {isAuth ? (
        <div className=" grid lg:grid-cols-7 gap-2">
          <div className=" hidden lg:block lg:col-span-1 bg-gray-50 h-screen">
            <SideBar />
          </div>
          <div className=" lg:col-span-6 bg-gray-50 h-screen">
            <NavBar />
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
