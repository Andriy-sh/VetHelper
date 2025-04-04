"use client";

import { deletePet } from "@/lib/actions/deletePet";

export default function DeletePet({ petId }: { petId: string }) {
  const handleDelete = async () => {
    await deletePet(petId);
  };

  return (
    <button onClick={handleDelete} aria-label="Delete pet">
      Видалити улюбленця
    </button>
  );
}
