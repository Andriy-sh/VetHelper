import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma";
import SingleClinic from "@/components/clinics/clinic";
import { auth } from "../../../../auth";
import { getPets } from "@/lib/service/user";
import Link from "next/link";

export default async function Clinic({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound();
  }
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
    where: { id: params.id },
  });
  if (!clinic) {
    notFound();
  }

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
      />
    </div>
  );
}
