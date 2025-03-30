import { prisma } from "../../../../../../prisma";

export default async function page({
  params,
}: {
  params: { clinicId: string; doctorId: string };
}) {
  try {
    const doctor = await prisma.user.findUnique({
      where: { id: params.doctorId },
    });

    if (!doctor) {
      return <div>Лікаря не знайдено</div>;
    }

    return (
      <div>
        <h1 className="text-2xl font-bold">{doctor.name}</h1>
        <p className="text-gray-600">{doctor.email}</p>
      </div>
    );
  } catch (error) {
    console.error("Помилка при отриманні даних лікаря:", error);
    return <div>Сталася помилка при завантаженні даних</div>;
  }
}
