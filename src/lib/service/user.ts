import { auth } from "../../../auth";
import { prisma } from "../../../prisma";

type Session = {
  user?: {
    email: string | null | undefined;
    image?: string;
    name?: string;
  };
};

export async function getSession() {
  const session = await auth();
  if (!session) {
    throw new Error('User not logged');
  }
  const user = session?.user;

  if (!user) {
    return { isLoggedIn: false, user: null };
  }

  return { isLoggedIn: true, user };
}

export async function getUser(session: Session) {
  if (!session?.user?.email) {
    throw new Error("User not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function getPets(userId: string) {
  const pets = await prisma.pet.findMany({
    where: { userId },
  });
  return pets;
}
