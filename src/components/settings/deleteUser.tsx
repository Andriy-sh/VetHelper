"use client";

import { deleteUser } from "@/lib/actions/deleteUser";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { HandleSignOut } from "../auth/SignOut";
export default function DeleteUser({
  userId,
  children,
}: {
  userId: string;
  children?: React.ReactNode;
}) {
  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      await HandleSignOut();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div>
      {children}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Видалити</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ви впевнені, що хочете видалити ваш аккаунт?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Цю дію не можна скасувати. Це назавжди видалить ваш аккаунт та всі
              пов`язані дані з нашої бази даних. Якщо ви впевнені, натисніть
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ні</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>
              Так, видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
