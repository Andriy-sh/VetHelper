"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { HandleSignOut } from "../auth/SignOut";
import Notification from "./notification";
import ChangeAvatar from "../profile/changeAvatar";
import { User } from "@/lib/interface";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

const NavLink = ({
  href,
  children,
  currentPath,
  exact = false,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  exact?: boolean;
  onClick?: () => void;
}) => {
  const isActive = exact ? currentPath === href : currentPath.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 text-lg font-medium ${
        isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
      }`}
    >
      {children}
    </Link>
  );
};

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const profileLinks = user
    ? [
        { href: `/profile/${user.id}`, label: "Профіль" },
        { href: "/settings/profile", label: "Налаштування" },
        { href: "/faq", label: "FAQ" },
      ]
    : [];

  useEffect(() => {
    closeMobileMenu();
    closeProfileMenu();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
      if (!(event.target as HTMLElement).closest(".profile-menu")) {
        closeProfileMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200">
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
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-indigo-300 transition-colors shadow-md"
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

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
                      >
                        {profileLinks.map(({ href, label }) => (
                          <NavLink
                            key={href}
                            href={href}
                            currentPath={pathname}
                            onClick={closeProfileMenu}
                          >
                            {label}
                          </NavLink>
                        ))}
                        <button
                          onClick={() => {
                            HandleSignOut();
                            closeProfileMenu();
                          }}
                          className="w-full text-left px-4 py-2.5 text-red-600 border-t border-gray-100"
                        >
                          Вийти
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              {guestLinks.map(({ href, label }) => (
                <NavLink key={href} href={href} currentPath={pathname} exact>
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-2"
          >
            {(session ? authLinks : guestLinks).map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                currentPath={pathname}
                exact={href === "/"}
                onClick={closeMobileMenu}
              >
                {label}
              </NavLink>
            ))}

            {session && user && (
              <>
                <hr className="my-2" />
                {profileLinks.map(({ href, label }) => (
                  <NavLink
                    key={href}
                    href={href}
                    currentPath={pathname}
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </NavLink>
                ))}
                <button
                  onClick={() => {
                    HandleSignOut();
                    closeMobileMenu();
                  }}
                  className="block w-full text-left text-red-600 px-4 py-2 hover:bg-red-50 rounded"
                >
                  Вийти
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
