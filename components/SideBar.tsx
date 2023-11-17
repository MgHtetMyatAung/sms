import React from "react";
import NavItem from "./NavItem";

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
    <div>
      <div className="px-3">
        <h2 className=" font-bold text-2xl p-3">SMS</h2>
      </div>
      <ul className=" space-y-1 px-3">
        {navLists.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
