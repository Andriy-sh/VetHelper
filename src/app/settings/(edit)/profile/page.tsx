import AddingCity from "@/components/profile/addingCity";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../prisma";

export default async function Page() {
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const email = session.user?.email;
  if (!email) {
    throw new Error("User email not found");
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const cityMessage = user.city
    ? `Місто: ${user.city}`
    : "Місто не вказано. Будь ласка, додайте своє місто.";

  return (
    <div className="w-max-[80vh]">
      <p>{cityMessage}</p>
      <AddingCity user={user} session={session} />
    </div>
  );
}
