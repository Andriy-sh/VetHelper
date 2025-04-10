"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandleSignOut } from "../auth/SignOut";
import { useState, useEffect } from "react";
import Notification from "./notification";
import ChangeAvatar from "../profile/changeAvatar";
import { User } from "@/lib/interface";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  exact?: boolean;
}

const NavLink = ({
  href,
  children,
  currentPath,
  exact = false,
}: NavLinkProps) => {
  const isActive = exact ? currentPath === href : currentPath.startsWith(href);

  return (
    <Link
      href={href}
      className={`px-4 py-1 text-lg font-medium transition-colors relative group
        ${
          isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
        }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 rounded-full
        transition-all duration-300 ease-out
        ${isActive ? "w-full" : "w-0 group-hover:w-full"}
        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
      ></span>
    </Link>
  );
};

const authLinks = [
  { href: "/clinics", label: "Клініки" },
  { href: "/map", label: "Карта" },
  { href: "/blogs", label: "Блоги" },
  { href: "/pets", label: "Ваші улюбленці" },
];

const guestLinks = [
  { href: "/sign-up", label: "Реєстрація" },
  { href: "/sign-in", label: "Логін" },
];

export default function NavBarElements({
  session,
  notifications,
  senders,
  user,
}: {
  session: Session | null;
  notifications: {
    id: string;
    message: string;
    userId: string;
    senderId: string;
    read: boolean;
    clinicId: string;
    createdAt: Date;
  }[];
  senders: {
    id: string;
    email: string;
    name: string;
    role: string;
  }[];
  user?: User;
}) {
  const pathname = usePathname();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  const profileLinks = user
    ? [
        { href: `/profile/${user.id}`, label: "Профіль" },
        { href: "/settings/profile", label: "Налаштування" },
        { href: "/faq", label: "FAQ" },
      ]
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".profile-menu")) {
        closeProfileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-white/80 shadow-sm shadow-slate-400 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors"
        >
          VetHelper
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {session ? (
            <>
              <div className="flex gap-6">
                {authLinks.map(({ href, label }) => (
                  <NavLink
                    key={href}
                    href={href}
                    currentPath={pathname}
                    exact={href === "/"}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Notification notifications={notifications} senders={senders} />

                <div className="relative profile-menu">
                  <button
                    onClick={toggleProfileMenu}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-300 transition-colors"
                    aria-label="Profile menu"
                  >
                    {user && (
                      <ChangeAvatar
                        height={40}
                        width={40}
                        imageId={user.image || "default.png"}
                        userIds={user.id}
                        change={false}
                      />
                    )}
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
                      {profileLinks.map(({ href, label }) => {
                        const isActive = pathname.startsWith(href);
                        return (
                          <Link
                            key={href}
                            onClick={closeProfileMenu}
                            href={href}
                            className={`block px-4 py-2.5 transition-colors relative
                              ${
                                isActive
                                  ? "text-indigo-600 bg-indigo-50"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                              }`}
                          >
                            {label}
                            {isActive && (
                              <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r"></span>
                            )}
                          </Link>
                        );
                      })}
                      <button
                        onClick={() => {
                          HandleSignOut();
                          closeProfileMenu();
                        }}
                        className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        Вийти
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              {guestLinks.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  currentPath={pathname}
                  exact={true}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
