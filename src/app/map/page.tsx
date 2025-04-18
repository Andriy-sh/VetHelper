import { getUser } from "@/lib/service/user";
import { auth } from "../../../auth";
import Map from "@/components/map/map";
import AddingCity from "@/components/profile/addingCity";
import { prisma } from "../../../prisma";
import { notFound } from "next/navigation"; // Using Next.js built-in for handling not found

export default async function MapPage() {
  try {
    // Get the user session
    const session = await auth();

    if (!session?.user?.email) {
      // If no user email, redirect or show an error
      throw new Error("User not authenticated");
    }

    // Fetch the user data using email
    const user = await getUser({ user: { email: session.user.email } });

    if (!user.city) {
      // If no city is set for the user, redirect to adding city page
      return <AddingCity userId={user.id} />;
    }

    // Fetch the clinics from the database for the user's city
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

    if (!clinics || clinics.length === 0) {
      // If no clinics found, you could handle this case (show a message or fall back)
      return <div>No clinics found in your city.</div>;
    }

    return (
      <div className="flex justify-center items-center ">
        <Map city={user.city} cityClinics={clinics} />
      </div>
    );
  } catch (error) {
    console.error(error);
    // Optionally, redirect to a login page or show a user-friendly error message
    notFound(); // Use Next.js's built-in notFound to handle missing pages
  }
}
