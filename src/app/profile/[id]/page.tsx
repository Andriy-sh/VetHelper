import UserInfo from "@/components/profile/userInfo";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";
import { PetInfo } from "@/components/profile/petInfo";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const appointment = await prisma.appointment.findMany({
    where: {
      userId: user?.id,
    },
  });
  const clinics = await prisma.clinic.findMany();
  return (
    <div className="p-8 space-x-8 flex bg-gray-100 justify-between">
      <UserInfo
        user={user}
        session={session}
        appointment={appointment}
        clinics={clinics}
      />

      <div className="w-[400px] rounded-2xl  max-h-[72vh]  bg-white  flex  flex-col justify-top">
        <PetInfo userId={user?.id} />
      </div>
    </div>
  );
}
