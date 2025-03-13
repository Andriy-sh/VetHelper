"use client";
import { PawPrint } from "lucide-react";
import Link from "next/link";

export default function Clinics({
  clinics,
}: {
  clinics: typeof clinics;
}) {
  return (
    <div className="p-4">
      {clinics.map((clinic) => (
        <Link
          href={`/clinics/${clinic.id}`}
          key={clinic.id}
          className="flex space-x-3 mb-6 p-4 border rounded-lg shadow-sm"
        >
          <PawPrint width={70} height={70} />
          <div>
            <p className="text-xl font-bold">{clinic.name}</p>
            <p className="text-gray-600">{clinic.city}</p>
            <p className="mt-2 text-gray-700">{clinic.description}</p>
            <p className="text-sm text-gray-500">{clinic.address}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
