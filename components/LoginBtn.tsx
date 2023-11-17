"use client";

import { AuthContext } from "@/context/AuthWrapper";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useLayoutEffect } from "react";

export default function LoginBtn() {
  const { isAuth, login } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    if (isAuth && pathname === "/login") {
      router.push("/");
    }
  }, [pathname, isAuth]);
  return (
    <div>
      <button
        className=" p-3 rounded bg-gray-800 text-white"
        onClick={() => login()}
      >
        Login
      </button>
    </div>
  );
}
