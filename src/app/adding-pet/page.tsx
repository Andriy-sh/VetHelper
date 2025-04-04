import AddPetForm from "@/components/addpet/AddPetForm";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>;
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email ?? undefined },
  });
  if (!user) {
    return <div>User not found</div>;
  }
  return <AddPetForm userId={user.id} />;
}
