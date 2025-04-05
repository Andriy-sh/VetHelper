import AddPetForm from "@/components/addpet/AddPetForm";
import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Unauthorized</div>;
  }

  const email = session.user?.email;

  if (!email) {
    console.error("Session exists but no email found");
    return <div>Invalid session data</div>;
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return <AddPetForm userId={user.id} />;
}
