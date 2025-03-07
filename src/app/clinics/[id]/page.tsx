import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma";
import SingleClinic from "@/components/clinics/clinic";

export default async function Clinic({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound();
  }
  const clinic = await prisma.clinic.findUnique({
    where: { id: params.id },
  });
  if (!clinic) {
    notFound();
  }
  return (
    <div className="mt-[72px]">
      <SingleClinic
        clinic={{
          ...clinic,
          phone: clinic.phone ?? "",
          website: clinic.website ?? "",
          updatedAt: clinic.updatedAt.toISOString(),
          createdAt: clinic.createdAt.toISOString(),
        }}
      />
    </div>
  );
}
