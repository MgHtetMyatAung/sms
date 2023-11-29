"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  item,
}: {
  item: { name: string; link: string };
}) {
  const pathname = usePathname();
  const isActive = pathname === item.link;
  console.log(isActive, pathname, item.link);
  return (
    <li>
      <Link
        className={` block p-3 ${
          isActive
            ? "bg-blue-50 font-medium text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-700"
            : "hover:bg-gray-100 hover:text-gray-800"
        }`}
        href={item.link}
      >
        {item.name}
      </Link>
    </li>
  );
}
