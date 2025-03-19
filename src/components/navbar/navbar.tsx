import { auth } from "../../../auth";
import { prisma } from "../../../prisma";
import NavBarElements from "./navBarElements";

export const NavBar = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return <NavBarElements session={null} notifications={[]} senders={[]} />;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return <NavBarElements session={session} notifications={[]} senders={[]} />;
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
  });
  const formattedNotifications = notifications.map((n) => ({
    id: String(n.id),
    message: n.message,
    userId: n.userId,
    senderId: n.senderId || "",
    clinicId: n.clinicId || "",
    read: n.read || false,
    createdAt: n.createdAt,
  }));

  const senderIds = [
    ...new Set(
      notifications.map((notification) => notification.senderId).filter(Boolean)
    ),
  ] as string[];

  const senders = senderIds.length
    ? await prisma.user
        .findMany({
          where: { id: { in: senderIds } },
          select: { id: true, email: true, name: true, role: true },
        })
        .then((users) =>
          users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name ?? "Unknown",
            role: user.role ?? "user",
          }))
        )
    : [];

  return (
    <NavBarElements
      session={session}
      notifications={formattedNotifications}
      senders={senders}
    />
  );
};
