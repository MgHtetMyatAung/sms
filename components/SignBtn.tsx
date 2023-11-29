"use client";
import { signIn } from "next-auth/react";
import React from "react";

export default function SignBtn() {
  return (
    <button
      className=" p-2 rounded-md border border-red-500"
      onClick={() => signIn()}
    >
      Sign In with Google
    </button>
  );
}
