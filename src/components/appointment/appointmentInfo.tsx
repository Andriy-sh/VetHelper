"use client";

import {
  Appointment,
  Clinic,
  CloudinaryResponse,
  Diseases,
  User,
} from "@/lib/interface";
import { Pet } from "@prisma/client";
import { Button } from "../ui/button";
import axios from "axios";
import { addDiseasesImage } from "@/lib/actions/diseasesImage";
import { Input } from "../ui/input";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { DiseaseSchema, diseaseSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import ChangePetAvatar from "../pets/changePetAvatar";
import { useRouter } from "next/navigation";
import AllergyDialog from "../pets/allergyDialog";

export default function AppointmentInfo({
  appointment,
  pet,
  user,
  diseases,
  clinic,
}: {
  appointment: Appointment;
  pet: Pet;
  user: User;
  diseases: Diseases[];
  clinic: Clinic;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useForm<DiseaseSchema>({
    resolver: zodResolver(diseaseSchema),
    defaultValues: {
      describe: "",
      name: "",
    },
  });
  const handleImageUpload = async (data: DiseaseSchema) => {
    const file = form.getValues("imageId");

    if (!file || !(file instanceof File)) {
      console.error("Файл не вибрано");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vet_diseases");

    try {
      setOpen(false);
      const response = await axios.post<CloudinaryResponse>(
        "https://api.cloudinary.com/v1_1/dddgmovz2/image/upload",
        formData
      );

      const public_id = response.data.public_id;

      await addDiseasesImage({
        imageId: public_id,
        name: data.name,
        description: data.describe,
        petId: pet.id,
      });
      router.refresh();
    } catch (error) {
      console.error("Помилка при завантаженні зображення:", error);
    }
  };

  return (
    <div className=" p-3 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h1 className="text-3xl font-bold text-white text-center">
            Інформація про прийом
          </h1>
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8">
            <ChangePetAvatar
              height={160}
              width={160}
              className="rounded-full border-4 border-white shadow-lg"
              change={false}
              imageId={pet.image ?? ""}
              petId={pet.id}
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-gray-600 mt-2">
                {pet.species} {pet.breed ? `— ${pet.breed}` : ""}
              </p>
              <p className="text-gray-600">Вік: {pet.age ?? "Невідомий"}</p>
              <p className="text-gray-600">Стать: {pet.gender ?? "Невідомо"}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Деталі запису
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Дата і час:</span>
                {appointment.date.toLocaleDateString()} о {appointment.time}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Статус запису:</span>
                {appointment.status}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Клініка:</span> {clinic.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Примітки:</span>
                {appointment.notes ?? "Немає приміток"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Історія хвороб
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Останній візит:</span>{" "}
                12.10.2023 — Діагноз: алергія
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Попередній візит:</span>{" "}
                05.08.2023 — Діагноз: захворювання шкіри
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Коментар ветеринара:</span>{" "}
                Рекомендую регулярні огляди та спеціальну дієту.
              </p>
            </div>
          </div>

          <div className=" bg-gray-50 p-6 rounded-lg mb-8">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Медичні документи
              </h3>
              {user.role === "VETERINARIAN" && (
                <div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default">Додати дані про хворобу</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Додати дані про хворобу</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleImageUpload)}
                          className="space-y-4"
                        >
                          <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <Label>Назва хвороби</Label>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Назва хвороби"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="describe"
                            control={form.control}
                            render={({ field }) => (
                              <FormItem>
                                <Label>Опис хвороби</Label>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Опис хвороби"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            name="imageId"
                            control={form.control}
                            render={({ field: { onChange } }) => (
                              <FormItem>
                                <Label>Зображення</Label>
                                <FormControl>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        onChange(file);
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600"
                          >
                            Додати дані про хворобу
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {diseases?.length > 0 ? (
                diseases.map((disease) => (
                  <HoverCard key={disease.id}>
                    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4">
                      <HoverCardTrigger>
                        <Image
                          width={200}
                          height={200}
                          src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_300,h_300,c_thumb/${disease.image}`}
                          alt={disease.name ?? "Фото захворювання"}
                          className="rounded-lg object-cover transform transition duration-300 hover:scale-110 hover:opacity-80"
                        />
                        <h4 className="text-lg  text-center  font-semibold mt-2 truncate max-w-[12.5rem]">
                          {disease.name}
                        </h4>
                      </HoverCardTrigger>
                    </div>
                    <HoverCardContent className="min-w-96 w-auto h-auto p-4 bg-white rounded-md shadow-lg">
                      <div className="flex flex-col justify-center text-center">
                        <div className="flex justify-center">
                          <Image
                            width={100}
                            height={100}
                            src={`https://res.cloudinary.com/dddgmovz2/image/upload/w_300,h_300,c_thumb/${disease.image}`}
                            alt={disease.name ?? "Фото захворювання"}
                            className="w-96 rounded-lg object-cover flex justify-center "
                          />
                        </div>
                        <h5 className="text-lgfont-semibold ">
                          {disease.name}
                        </h5>
                        <p className="text-gray-600  max-w-96">
                          {disease.description}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))
              ) : (
                <p className="text-gray-600 col-span-full text-center">
                  Немає даних
                </p>
              )}
            </div>
            <AllergyDialog petId={pet.id} clinicId={clinic.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
