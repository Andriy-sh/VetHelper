import Clinics from "@/components/clinics/clinics";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export default async function Page() {
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
  const clinics = await prisma.clinic.findMany({
    where: { city: user?.city ?? undefined },
  });
  const as = await prisma.appointment.findMany({});
  return (
    <div className="mt-[72px]">
      <div className="flex justify-between mx-8">
        <h1>All in your City</h1>
        {user.role === "Admin" && <div>Ви Адмін</div>}
        {as.map((as) => (
          <div key={as.id}>{as.date.toString()}</div>
        ))}
      </div>

      <Clinics clinics={clinics} />
    </div>
  );
}
