import UserInfo from "@/components/profile/userInfo";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";
import { PetInfo } from "@/components/profile/petInfo";
import { User } from "@/lib/interface";
import { getPets } from "@/lib/service/user";
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
  const pets = await getPets(user?.id || "");

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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-200 p-8 space-x-8 flex items-start justify-between">
      <UserInfo
        user={user || ({} as User)}
        session={session}
        appointment={appointment}
        clinics={clinics}
      />

      <div className="w-[350px] rounded-2xl  max-h-[72vh]  bg-white  flex  flex-col justify-top">
        <PetInfo
          userId={user?.id || ""}
          pets={pets}
          session={session}
          user={user || ({} as User)}
        />
      </div>
    </div>
  );
}
