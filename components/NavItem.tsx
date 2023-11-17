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
        className={` block p-3 font-medium hover:bg-gray-100 hover:text-gray-800 hover:shadow-sm ${
          isActive &&
          "bg-blue-50 text-blue-700 shadow-sm hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
        }`}
        href={item.link}
      >
        {item.name}
      </Link>
    </li>
  );
}
