import { HandleSignOut } from "@/components/auth/SignOut";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to the Dashboard
        </h1>

        <div className="text-lg font-medium text-gray-700">
          {session?.user?.name
            ? `Hello, ${session.user.name}!`
            : "Welcome, Guest"}
        </div>

        <div className="mt-6">
          {!session ? (
            <div className="flex flex-col space-y-4">
              <Link
                href="/signUp"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/signIn"
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition-colors"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="text-lg text-green-600 font-semibold mt-4">
              You are logged in
            </div>
          )}
        </div>

        {session && (
          <button
            onClick={HandleSignOut}
            className="mt-6 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
