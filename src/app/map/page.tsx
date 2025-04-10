import { getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import Map from "@/components/map/map";
import AddingCity from "@/components/profile/addingCity";
import { prisma } from "../../../prisma";

export default async function MapPage() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await getUser({ user: { email: session.user.email } });

  if (!user.city) {
    return <AddingCity userId={user.id} />;
  }
  const clinics = (
    await prisma.clinic.findMany({
      where: { city: user.city },
      include: {
        ClinicReview: {
          include: {
            user: true,
          },
        },
      },
    })
  ).map((clinic) => ({
    ...clinic,
    ClinicReview: clinic.ClinicReview.map((review) => ({
      ...review,
      rating: review.rating ? Number(review.rating) : null,
    })),
  }));

  return (
    <div className="flex justify-center items-center ">
      <Map city={user.city} cityClinics={clinics} />
    </div>
  );
}
