import { HandleSignOut } from "@/components/auth/SignOut";
import Image from "next/image";
import { auth } from "../../../auth";
import { PetInfo } from "@/components/profile/petInfo";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="min-h-screen flex bg-gray-100 justify-center items-center" >
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="min-h-[82vh] mt-[40px] w-full bg-white rounded-2xl shadow-xl p-8 flex    space-x-8">
          <div className="relative w-32 h-32">
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              fill
              priority
              className="rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {session?.user?.name || "Guest"}
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              {session?.user?.email || "No email available"}
            </p>
          </div>

          {session && (
            <button
              onClick={HandleSignOut}
              className="px-6 py-3 bg-red-600 w-30 h-14 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      <div className="w-2/7 rounded-2xl  min-h-[82vh] mt-[40px] bg-white shadow-xl flex items-center flex-col justify-top p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 ">Your Pets</h2>
        <PetInfo />
      </div>
    </div>
  );
}
