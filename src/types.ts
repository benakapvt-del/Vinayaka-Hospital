/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  role: string;
  degree: string;
  experience: number; // in years
  consultationHours: string;
  rating: number;
  imageUrl: string;
  bio: string;
  availability: {
    days: string[]; // e.g. ["Mon", "Tue", "Wed", "Thu", "Fri"]
    slots: string[]; // e.g. ["10:00 AM", "11:30 AM", "02:00 PM"]
  };
}

export interface Department {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string; // To match lucide-react icons
  services: string[];
  bedCount?: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientAge: number;
  specialtyId: string;
  specialtyName: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "10:00 AM"
  symptoms: string;
  priority: 'routine' | 'urgent' | 'emergency';
  bookingReference: string; // e.g., VH-2026-XXXX
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}
