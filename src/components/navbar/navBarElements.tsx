"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HandleSignOut } from "../auth/SignOut";
import { useState, useEffect } from "react";
import Notification from "./notification";
import ChangeAvatar from "../profile/changeAvatar";
import { User } from "@/lib/interface";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={href}
        className={`px-4 py-1 text-lg font-medium transition-colors relative group
          ${
            isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-600"
          }`}
      >
        {children}
        <motion.span
          initial={{ width: isActive ? "100%" : "0%" }}
          animate={{ width: isActive ? "100%" : "0%" }}
          className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 rounded-full
          ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
        />
      </Link>
    </motion.div>
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

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed z-50 top-0 left-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors"
          >
            VetHelper
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {session ? (
            <>
              <motion.div variants={itemVariants} className="flex gap-6">
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
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Notification
                    notifications={notifications}
                    senders={senders}
                  />
                </motion.div>

                <div className="relative profile-menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
                      >
                        <div className="absolute -top-1.5 right-3 w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-200" />
                        {profileLinks.map(({ href, label }, index) => {
                          const isActive = pathname.startsWith(href);
                          return (
                            <motion.div
                              key={href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <Link
                                href={href}
                                onClick={closeProfileMenu}
                                className={`block px-4 py-2.5 ${
                                  isActive
                                    ? "text-indigo-600"
                                    : "text-gray-700 hover:text-indigo-600"
                                } transition-colors relative`}
                              >
                                {label}
                                {isActive && (
                                  <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r" />
                                )}
                              </Link>
                            </motion.div>
                          );
                        })}
                        <motion.button
                          whileHover={{ backgroundColor: "#FEE2E2" }}
                          onClick={() => {
                            HandleSignOut();
                            closeProfileMenu();
                          }}
                          className="w-full text-left px-4 py-2.5 text-red-600 transition-colors border-t border-gray-100"
                        >
                          Вийти
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div variants={itemVariants} className="flex gap-4">
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
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
