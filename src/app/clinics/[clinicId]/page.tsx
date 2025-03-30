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
    where: { id: params?.clinicId },
    include: {
      user: true,
      ClinicReview: { include: { user: true } },
      ClinicFAQ: true,
      ClinicService: true,
    },
  });
  const clinicImages = await prisma.clinicImage.findMany({
    where: { clinicId: clinic?.id },
  });
  if (!clinic) {
    notFound();
  }
  const pets = await prisma.pet.findMany({
    where: { userId: user.id },
  });
  const appointments = await prisma.appointment.findMany({
    where: { clinicId: clinic.id },
  });
  const newsCategory = await prisma.clinicNewsCategory.findMany();
  const clinicNews = await prisma.clinicNews.findMany({
    where: {
      clinicId: clinic.id,
    },
    include: { category: true },
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
        clinicImages={clinicImages}
        user={user}
        pets={pets}
        appointments={appointments}
        doctors={clinic.user}
        reviews={clinic.ClinicReview}
        FAQ={clinic.ClinicFAQ}
        clinicServices={clinic.ClinicService}
        newsCategory={newsCategory}
        clinicNews = {clinicNews}
      />
    </div>
  );
}
