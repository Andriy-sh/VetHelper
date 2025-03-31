import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma";
import SingleClinic from "@/components/clinics/clinic";
import { auth } from "../../../../auth";

export default async function Clinic(props: {
  params: Promise<{ clinicId: string }>;
}) {
  const resolvedParams = await props.params;
  const clinicId = resolvedParams.clinicId;

  if (!clinicId) {
    notFound();
  }

  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });

  if (!user) {
    throw new Error("User not logged in");
  }

  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    include: {
      user: true,
      ClinicReview: { include: { user: true } },
      ClinicFAQ: true,
      ClinicService: true,
    },
  });

  if (!clinic) {
    notFound();
  }

  const clinicImages = await prisma.clinicImage.findMany({
    where: { clinicId },
  });
  const pets = await prisma.pet.findMany({ where: { userId: user.id } });
  const appointments = await prisma.appointment.findMany({
    where: { clinicId },
  });
  const newsCategory = await prisma.clinicNewsCategory.findMany();
  const clinicNews = await prisma.clinicNews.findMany({
    where: { clinicId },
    include: { category: true },
  });

  return (
    <SingleClinic
      clinic={{
        ...clinic,
        phone: clinic.phone ?? "",
        website: clinic.website ?? "",
        updatedAt: clinic.updatedAt.toISOString(),
        createdAt: clinic.createdAt.toISOString(),
      }}
      clinicImages={clinicImages}
      user={user}
      pets={pets}
      appointments={appointments}
      doctors={clinic.user}
      reviews={clinic.ClinicReview}
      FAQ={clinic.ClinicFAQ}
      clinicServices={clinic.ClinicService}
      newsCategory={newsCategory}
      clinicNews={clinicNews}
    />
  );
}
