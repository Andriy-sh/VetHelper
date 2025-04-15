"use server";

import { prisma } from "../../../prisma";

export const editClinic = async (formdata: FormData) => {
  const id = formdata.get("id") as string;
  const name = formdata.get("name") as string;
  const address = formdata.get("address") as string;
  const phone = formdata.get("phone") as string;
  const website = formdata.get("website") as string;
  const city = formdata.get("city") as string;
  const description = formdata.get("description") as string;
  await prisma.clinic.update({
    where: { id: id },
    data: {
      name: name,
      address: address,
      phone: phone,
      website: website,
      city: city,
      description: description,
    },
  });
};
