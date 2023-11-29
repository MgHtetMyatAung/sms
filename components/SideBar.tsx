import React from "react";
import NavItem from "./NavItem";
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";

const navLists = [
  { id: 1, name: "Dashboard", link: "/" },
  { id: 2, name: "Students", link: "/students" },
  { id: 3, name: "Teachers", link: "/teachers" },
  { id: 4, name: "Courses", link: "/courses" },
  { id: 5, name: "Payments", link: "/payments" },
  { id: 6, name: "Announcement", link: "/announcement" },
  { id: 7, name: "Chat", link: "/chat" },
  { id: 8, name: "Posts", link: "/posts" },
];

export default function SideBar() {
  return (
    <div className=" relative h-screen border-dashed border-r-[1px] border-gray-300">
      <div className="px-3">
        <h2 className=" font-bold text-2xl p-3">SMS</h2>
      </div>
      <ul className=" space-y-1 px-3">
        {navLists.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>

      <Button
        className=" p-2 bg-gray-800 text-gray-50 rounded-md absolute bottom-5 left-6"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </div>
  );
}
