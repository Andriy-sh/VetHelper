"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menuItems = [
  { label: "Профіль", href: "/settings/profile" },
  { label: "Акаунт", href: "/settings/account" },
  { label: "Сповіщення", href: "/settings/notifications" },
  { label: "Безпека", href: "/settings/security" },
  { label: "Конфіденційність", href: "/settings/privacy" },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen bg-white border-r border-gray-200 w-64 flex flex-col p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Налаштування</h2>
      <ul className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              <div
                className={clsx(
                  "p-3 rounded-lg transition duration-200 cursor-pointer",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {item.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
