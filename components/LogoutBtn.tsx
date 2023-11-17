"use client";

import { AuthContext } from "@/context/AuthWrapper";
import { useContext } from "react";

export default function LogoutBtn() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button
        className=" p-3 rounded bg-gray-800 text-white"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
