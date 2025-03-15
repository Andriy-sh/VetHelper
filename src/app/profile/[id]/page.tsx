import { prisma } from "../../../../prisma";

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });
  return (
    <div>
      <h1>{user?.name}</h1>
    </div>
  );
}
