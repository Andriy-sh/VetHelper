import { auth } from "../../../../../auth";
import { prisma } from "../../../../../prisma";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, Trash2 } from "lucide-react";
import AddingCity from "@/components/profile/addingCity";
import DeleteUser from "@/components/settings/deleteUser";
import { Separator } from "@radix-ui/react-select";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Користувача не автентифіковано або не знайдено email.");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("Користувача не знайдено в базі даних.");
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Налаштування профілю</h1>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ваше місцезнаходження
            </h2>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              {user.city ? `Місто: ${user.city}` : "Місто не вказано"}
            </p>
            <AddingCity userId={user.id} />
          </div>
        </CardContent>
      </Card>
      <Card className="border border-red-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Небезпечна зона
            </h2>
          </div>
        </CardHeader>
        <Separator className="bg-red-100" />
        <CardContent className="pt-4 space-y-4">
          <p className="text-gray-700">
            Видалення акаунту є <strong>незворотною дією</strong>. Усі ваші дані
            буде остаточно стерто з нашої бази.
          </p>
          <DeleteUser userId={user.id} />
        </CardContent>
      </Card>
    </div>
  );
}
