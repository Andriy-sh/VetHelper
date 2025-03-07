import Link from "next/link";
import { auth } from "../../../auth";
import { HandleSignOut } from "../auth/SignOut";

export const NavBar = async () => {
  const session = await auth();

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
          {!session ? (
            <>
              <Link
                href="/sign-up"
                className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
              >
                Sign In
              </Link>
            </>
          ) : (
            <div className="space-x-3">
              <Link
                href="/clinics"
                className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
              >
                Clinics
              </Link>
              <Link
                href="/map"
                className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
              >
                Maps
              </Link>
              <Link
                href="/profile"
                className="px-6 py-2 rounded-lg text-black bg-white border border-black hover:bg-gray-100 transition duration-300 shadow-md"
              >
                Profile
              </Link>
              <button
                onClick={HandleSignOut}
                className="px-6 py-3 bg-red-600 w-30 h-14 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden bg-white text-black flex flex-col items-center space-y-4 py-4 shadow-lg">
        {!session ? (
          <>
            <Link
              href="/sign-up"
              className="text-lg hover:text-gray-700 transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              className="text-lg hover:text-gray-700 transition duration-300"
            >
              Sign In
            </Link>
          </>
        ) : (
          <Link
            href="/profile"
            className="text-lg hover:text-gray-700 transition duration-300"
          >
            Profile
          </Link>
        )}
      </div>
    </nav>
  );
};
