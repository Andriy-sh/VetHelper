"use client";

import { useState } from "react";
import { deleteUser } from "@/lib/actions/deleteUser";
import { HandleSignOut } from "../auth/SignOut";
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

export default function DeleteUser({
  userId,
  children,
}: {
  userId: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId);
      await HandleSignOut();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {children && <div className="mb-2">{children}</div>}
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
              пов&aspos;язані дані з нашої бази даних.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Ні</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? "Видалення..." : "Так, видалити"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
