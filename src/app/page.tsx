import { HandleSignOut } from "@/components/auth/SignOut";
import Link from "next/link";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen space-y-4">
      <div className="text-2xl font-semibold">Welcome to the Dashboard</div>
      <div className="space-x-4">
        {!session ? (
          <div>
            <Link
              href="/signUp"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/signIn"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div>You are loged</div>
        )}
      </div>

      <button
        onClick={HandleSignOut}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors"
      >
        Sign Out
      </button>

      <div className="mt-4 text-xl font-medium">
        {session?.user?.name ? `Hello, ${session.user.name}` : "Welcome, Guest"}
      </div>
    </div>
  );
}
