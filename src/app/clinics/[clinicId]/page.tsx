import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma";
import SingleClinic from "@/components/clinics/clinic";
import { auth } from "../../../../auth";

export default async function Clinic({
  params,
}: {
  params: { clinicId: string };
}) {
  if (!params.clinicId) {
    notFound();
  }
  console.log(params.clinicId);
  const session = await auth();
  if (!session) {
    throw new Error("Blablabla");
  }
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });
  if (!user) {
    throw new Error("User not logged");
  }
  const clinic = await prisma.clinic.findUnique({
    where: { id: params.clinicId },
  });
  if (!clinic) {
    notFound();
  }
  const pets = await prisma.pet.findMany({
    where: { userId: user.id },
  });

  return (
    <div>
      <SingleClinic
        clinic={{
          ...clinic,
          phone: clinic.phone ?? "",
          website: clinic.website ?? "",
          updatedAt: clinic.updatedAt.toISOString(),
          createdAt: clinic.createdAt.toISOString(),
        }}
        user={user}
        pets={pets}
      />
    </div>
  );
}
