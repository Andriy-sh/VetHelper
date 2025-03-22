import { AppointmentStatus, Gender, Role, Species } from "@prisma/client";

export interface User {
  name: string | null;
  id: string;
  surname: string | null;
  username: string | null;
  email: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
  clinicId: string | null;
  role: Role | null;
}
export interface Appointment {
  id: string;
  petId: string;
  clinicId: string;
  userId: string;
  date: Date;
  time: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: AppointmentStatus;
}
export interface Clinic {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string | null;
  age: number | null;
  gender: Gender | null;
  image: string | null;
  userId: string;
}

export interface Diseases {
  id: string;
  petId: string;
  name: string | null;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface CloudinaryResponse {
  public_id: string;
}
