import AddingCity from "@/components/profile/addingCity";
import { PetInfo } from "@/components/profile/petInfo";
import UserInfo from "@/components/profile/userInfo";
import { getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  // if (!user.city) {
  //   return <AddingCity session={session} user={user} />;
  // }
  const appointment = await prisma.appointment.findMany({
    where: {
      userId: user.id,
    },
  });
  const clinics = await prisma.clinic.findMany();
  return (
    <div className="p-8 space-x-8 flex bg-gray-100 justify-center ">
      <UserInfo
        user={user}
        session={session}
        appointment={appointment}
        clinics={clinics}
      />

      <div className="p-8 w-2/7 rounded-2xl  min-h-screen  bg-white shadow-xl flex  flex-col justify-top  overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 ">Your Pets</h2>
        <PetInfo />
      </div>
    </div>
  );
}
