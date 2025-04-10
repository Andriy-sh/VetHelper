import UserInfo from "@/components/profile/userInfo";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";
import { PetInfo } from "@/components/profile/petInfo";
import { User } from "@/lib/interface";
type Params = Promise<{ id: string }>;
export default async function page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.id },
  });
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const appointment = await prisma.appointment.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      clinic: true,
    },
  });
  const clinics = await prisma.clinic.findMany();
  return (
    <div className="p-8 space-x-8 flex bg-gray-100 justify-between">
      <UserInfo
        user={user || ({} as User)}
        session={session}
        appointment={appointment}
        clinics={clinics}
      />

      <div className="w-[400px] rounded-2xl  max-h-[72vh]  bg-white  flex  flex-col justify-top">
        <PetInfo userId={user?.id || ""} />
      </div>
    </div>
  );
}
