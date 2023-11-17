"use client";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useTransition } from "react";

export const AuthContext = createContext(null);

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const login = () => {
    localStorage.setItem("auth", JSON.stringify("true"));
    startTransition(() => {
      router.push("/");
    });
  };
  const logout = () => {
    localStorage.clear();
    startTransition(() => {
      router.push("/login");
    });
  };

  const isAuth = localStorage.getItem("auth");
  interface AuthFun {
    login: () => void;
    logout: () => void;
    isAuth: String | null;
  }
  const values = { login, logout, isAuth };
  return (
    <AuthContext.Provider value={values}>
      {!isPending && children}
    </AuthContext.Provider>
  );
};
