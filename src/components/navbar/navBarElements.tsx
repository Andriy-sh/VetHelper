"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { HandleSignOut } from "../auth/SignOut";
import { useState, useEffect } from "react";
import Image from "next/image";
import Notification from "./notification";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <Link
    href={href}
    className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
  >
    {children}
  </Link>
);

export default function NavBarElements({
  session,
  notifications,
  senders,
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
}) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".profile-menu")) {
        closeProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link
          href="/"
          className="text-3xl font-semibold tracking-wide text-black hover:text-gray-700 transition duration-300"
        >
          VetHelper
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {session ? (
            <>
              <NavLink href="/clinics">Clinics</NavLink>
              <NavLink href="/map">Maps</NavLink>
              <Notification notifications={notifications} senders={senders} />
              <div className="relative profile-menu">
                <button
                  onClick={toggleProfileMenu}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition duration-300"
                >
                  <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 ease-in-out transform ${
                    isProfileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-200"></div>
                  <Link
                    onClick={closeProfileMenu}
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={closeProfileMenu}
                    href="/settings/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      HandleSignOut();
                      closeProfileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <NavLink href="/sign-up">Sign Up</NavLink>
              <NavLink href="/sign-in">Sign In</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
