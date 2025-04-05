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
  clinic: {
    id: string;
    name: string;
    address: string;
    city: string;
    description: string;
    phone: string | null;
    website: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
  phone: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
  ClinicReview?: ClinicReviews[];
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
export interface Vacctination {
  id: string;
  petId: string;
  name: string;
  date: Date;
  nextDoseDue: Date | null;
  notes: string | null;
  clinic: Clinic | null;
}

export interface Allergy {
  id: string;
  petId: string;
  name: string;
  symptoms: string;
  recommendations: string | null;
  dateDetected: Date;
  clinic: Clinic | null;
}

export interface Blogs {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string | null;
  imageId: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  clinic: {
    name: string;
    city: string;
    address: string;
    phone: string | null;
    website: string | null;
  };
}
export interface ClinicImages {
  id: string;
  title: string | null;
  content: string | null;
  userId: string | null;
  url: string;
  clinicId: string;
}

export interface ClinicReviews {
  id: string;
  userId: string;
  clinicId: string;
  rating: number | null;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
export interface ClinicFAQ {
  id: string;
  clinicId: string;
  question: string;
  answer: string;
}
export interface ClinicService {
  id: string;
  clinicId: string;
  name: string;
  description: string | null;
  price: number | null;
  duration: number | null;
  category: string | null;
  imageId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface ClinicNews {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  clinicId: string | null;
  categoryId: string | null;
  publishDate: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: ClinicNewsCategory;
}

export interface ClinicNewsCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ClinicPromotion {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  clinicId: string;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
