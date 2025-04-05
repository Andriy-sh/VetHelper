import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma";
import SingleClinic from "@/components/clinics/clinic";
import { auth } from "../../../../auth";
import { ClinicNews } from "@/lib/interface";
type Params = Promise<{ clinicId: string }>;
export default async function Clinic(props: { params: Params }) {
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
      user: true, // Включаємо всі дані про користувача
      ClinicReview: {
        include: {
          user: true, // Включаємо дані користувача для кожного відгуку
        },
      },
      ClinicFAQ: true,
      ClinicService: true,
    },
  });

  if (!clinic) {
    notFound();
  }
  const fixedClinic = {
    ...clinic,
    ClinicReview: clinic.ClinicReview.map((review) => ({
      ...review,
      rating: review.rating ? Number(review.rating) : null,
    })),
  };
  const clinicImages = await prisma.clinicImage.findMany({
    where: { clinicId },
  });
  const pets = await prisma.pet.findMany({ where: { userId: user.id } });
  const appointments = await prisma.appointment.findMany({
    where: { clinicId },
    include: { clinic: true },
  });
  const newsCategory = await prisma.clinicNewsCategory.findMany();
  const clinicNews = (
    await prisma.clinicNews.findMany({
      where: { clinicId },
      include: { category: true },
    })
  ).filter((news) => news.category !== null) as ClinicNews[];

  return (
    <SingleClinic
      clinic={{
        ...fixedClinic,
        phone: clinic.phone ?? "",
        website: clinic.website ?? "",
        updatedAt: clinic.updatedAt,
        createdAt: clinic.createdAt,
      }}
      clinicImages={clinicImages}
      user={user}
      pets={pets}
      appointments={appointments}
      doctors={clinic.user}
      reviews={clinic.ClinicReview.map((review) => ({
        ...review,
        rating: review.rating !== null ? parseFloat(review.rating) : null,
      }))}
      FAQ={clinic.ClinicFAQ}
      clinicServices={clinic.ClinicService}
      newsCategory={newsCategory}
      clinicNews={clinicNews}
    />
  );
}
