import PetsPage from "@/components/pets/petsPage";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
export const dynamic = "force-dynamic";

export default async function page() {
  const session = await auth();
  if (!session) {
    return <div>anfoasndo</div>;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });
  if (!user) {
    return <div>aosdnaosnd</div>;
  }
  const pets = await prisma.pet.findMany({
    where: { userId: user.id },
  });

  return (
    <div>
      <PetsPage pets={pets} />
    </div>
  );
}
