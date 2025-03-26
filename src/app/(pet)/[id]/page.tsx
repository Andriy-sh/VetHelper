import { prisma } from "../../../../prisma";
import { notFound } from "next/navigation";

import PetInfo from "@/components/pets/petInfo";
import { auth } from "../../../../auth";

export async function generateStaticParams() {
  const pets = await prisma.pet.findMany({ select: { id: true } });
  return pets.map((pet) => ({ id: pet.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  if (!params?.id) {
    notFound();
  }

  const pet = await prisma.pet.findUnique({
    where: { id: params.id },
  });

  if (!pet) {
    notFound();
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      petId: pet.id,
    },
    include: { clinic: true },
  });
  const session = await auth();
  if (!session) {
    notFound();
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email ?? undefined,
    },
    include: { clinic: true },
  });
  if (!user) {
    notFound();
  }
  const vacctination = await prisma.vaccination.findMany({
    where: { petId: pet.id },
  });

  const allergies = await prisma.allergy.findMany({
    where: { petId: pet.id },
    include: { clinic: true },
  });
  return (
    <PetInfo
      pet={pet}
      appointments={appointments}
      user={user}
      vacctination={vacctination}
      allergies={allergies}
    />
  );
}
