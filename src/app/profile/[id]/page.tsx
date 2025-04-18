import UserInfo from "@/components/profile/userInfo";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma";
import { PetInfo } from "@/components/profile/petInfo";
import { User } from "@/lib/interface";
import { getPets } from "@/lib/service/user";

type Params = Promise<{ id: string }>;

export default async function page({ params }: { params: Params }) {
  try {
    const resolvedParams = await params;

    // Отримуємо користувача з бази даних
    const user = await prisma.user.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Перевіряємо автентифікацію
    const session = await auth();
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    // Отримуємо тварин користувача
    const pets = await getPets(user?.id || "");

    // Отримуємо записані прийоми
    const appointment = await prisma.appointment.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        clinic: true,
      },
    });

    // Отримуємо клініки
    const clinics = await prisma.clinic.findMany();

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-200 p-4 lg:p-8 space-y-8 lg:space-x-8 flex flex-col lg:flex-row items-start justify-between">
        <div className="flex-1">
          <UserInfo
            user={user || ({} as User)}
            session={session}
            appointment={appointment}
            clinics={clinics}
          />
        </div>

        <div className="w-full lg:w-[350px] max-h-[72vh] bg-white flex flex-col rounded-2xl">
          <PetInfo
            userId={user?.id || ""}
            pets={pets}
            session={session}
            user={user || ({} as User)}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-500">
          Виникла помилка при завантаженні сторінки. Спробуйте пізніше.
        </p>
      </div>
    );
  }
}
