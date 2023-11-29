"use client";
import React, { ReactNode, useLayoutEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";

export default function LayoutControl({ children }: { children: ReactNode }) {
  const { status, data } = useSession();
  const pathname = usePathname();

  if (status === "unauthenticated" && pathname !== "/auth/signin") {
    redirect("/auth/signin");
  }

  if (status === "authenticated" && pathname === "/auth/signin") {
    redirect("/");
  }

  console.log(pathname, "pathname");

  return (
    <>
      {status === "authenticated" ? (
        <div className=" flex gap-2">
          <div className=" hidden lg:block lg:w-[250px] bg-gray-50 h-screen">
            <SideBar />
          </div>
          <div className=" lg:flex-grow bg-gray-50 h-screen">
            <NavBar />
            <section className=" lg:px-5">{children}</section>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
