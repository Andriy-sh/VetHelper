import { auth } from "../../../../../auth";
import { prisma } from "../../../../../prisma";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, MapPin, Trash2 } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import AddingCity from "@/components/profile/addingCity";
import DeleteUser from "@/components/settings/deleteUser";

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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Налаштування профілю</h1>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Ваше місцезнаходження</h2>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              {user.city ? `Місто: ${user.city}` : "Місто не вказано"}
            </p>
            <AddingCity userId={user.id}>
              <Button variant="outline" size="sm">
                <Pencil className="w-4 h-4 mr-2" />
                {user.city ? "Змінити" : "Додати"}
              </Button>
            </AddingCity>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-100">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-red-600">
              Небезпечна зона
            </h2>
          </div>
        </CardHeader>
        <Separator className="bg-red-100" />
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-gray-700">
              Видалення акаунту є незворотньою дією. Усі ваші дані буде видалено
              назавжди.
            </p>
            <DeleteUser userId={user.id}>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Видалити акаунт
              </Button>
            </DeleteUser>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
