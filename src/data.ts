/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, Department, Testimonial } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    shortDescription: 'Comprehensive cardiovascular diagnostics, interventions, and preventive care.',
    detailedDescription: 'Our Cardiology Department features a state-of-the-art Cath Lab, high-tech ECG/Echocardiography, and advanced coronary care. We deal with coronary artery diseases, heart failures, and rhythm disorders with premium medical precision.',
    iconName: 'Heart',
    services: [
      '24/7 Coronary Angioplasty',
      'Echocardiography & TMT',
      'Pacemaker & ICD Implantation',
      'Hypertension Clinic',
      'Heart Failure Management'
    ],
    bedCount: 22
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Care',
    shortDescription: 'Advanced treatments for bone and joint disorders, trauma, and spine diseases.',
    detailedDescription: 'Led by premium surgeons, we offer computer-assisted joint replacements, arthroscopic sports surgeries, and comprehensive trauma rehabilitation set against the highest safety standards.',
    iconName: 'Activity',
    services: [
      'Total Knee & Hip Replacement',
      'Sports Injury & Arthroscopy',
      'Spine Surgery & Disc Therapy',
      'Pediatric Orthopedics',
      'Osteoporosis & Arthritis Clinic'
    ],
    bedCount: 30
  },
  {
    id: 'gynecology',
    name: 'Obstetrics & Gynecology',
    shortDescription: 'Dedicated healthcare for women through all stages of life, from maternity to menopause.',
    detailedDescription: 'Our maternity suite provides a warm and comfortable environment for childbirth. We also specialize in high-risk pregnancies, hormonal disorders, laparoscopic gynecology, and reproductive medicine.',
    iconName: 'Sparkles',
    services: [
      'High-Risk Pregnancy Care',
      'Painless Labour & Maternity Suites',
      'Laparoscopic Hysterectomy',
      'PCOS & Infertility Treatments',
      'Adolescent Health Counseling'
    ],
    bedCount: 25
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatology',
    shortDescription: 'Compassionate pediatric care, advanced NICU, and children health tracking.',
    detailedDescription: 'Equipped with a top-tier LEVEL-III Neonatal Intensive Care Unit (NICU) and Pediatric ICU (PICU), we protect our youngest patients with constant diligence and expertise.',
    iconName: 'Baby',
    services: [
      'Level III Neonatal ICU (NICU)',
      'Developmental Screening & Tracking',
      'Childhood Immunization Programs',
      'Pediatric Respiratory Therapies',
      'Childhood Obesity & Nutrition'
    ],
    bedCount: 15
  },
  {
    id: 'surgery',
    name: 'General & Laparoscopic Surgery',
    shortDescription: 'Minimally invasive and standard surgical interventions with high recovery rates.',
    detailedDescription: 'Using high-definition laparoscopic systems, our surgeons perform keyhole surgeries that dramatically minimize healing times, pain, and hospital stays.',
    iconName: 'ShieldAlert',
    services: [
      'Laparoscopic Cholecystectomy',
      'Laparoscopic Hernia Repair',
      'Appendectomy & Colorectal Care',
      'Thyroid & Breast Lump Surgeries',
      'Advanced Wound Management'
    ],
    bedCount: 20
  },
  {
    id: 'emergency',
    name: 'Emergency & Critical Care',
    shortDescription: 'Round-the-clock intensive medical responses for trauma, cardiac arrests, and acute illnesses.',
    detailedDescription: 'Our 24/7 emergency response unit is staffed with traumatologists and intensive care specialists who stand ready to save lives at any second.',
    iconName: 'Stethoscope',
    services: [
      '24/7 Emergency & Red Zone Trauma',
      'Cardiac Emergency Resuscitations',
      'Fully Equipped Life-Support Ambulances',
      'ICU & Ventilary Support Care',
      'Poison & Toxicology Management'
    ],
    bedCount: 18
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-farooq-bhat',
    name: 'Dr. Farooq Ahmad Bhat',
    specialtyId: 'cardiology',
    specialtyName: 'Cardiology & Heart Care',
    role: 'Chief Cardiologist & HOD',
    degree: 'MBBS, MD (Medicine), DM (Cardiology) - BMCRI Bangalore',
    experience: 18,
    consultationHours: '10:00 AM - 01:30 PM (Mon, Wed, Fri)',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    bio: 'Dr. Farooq Bhat is one of Bangalore\'s leading cardiologists with almost two decades of expertise in interventional cardiology. He is renowned for complex angioplasties and state-of-the-art heart care interventions.',
    availability: {
      days: ['Mon', 'Wed', 'Fri'],
      slots: ['10:00 AM', '10:45 AM', '11:30 AM', '12:15 PM', '01:00 PM']
    }
  },
  {
    id: 'dr-shazia-malik',
    name: 'Dr. Shazia Malik',
    specialtyId: 'gynecology',
    specialtyName: 'Obstetrics & Gynecology',
    role: 'Senior Consultant Gynecologist',
    degree: 'MBBS, MS (Gynecology & Obstetrics) - St. John\'s Medical College',
    experience: 14,
    consultationHours: '11:00 AM - 03:00 PM (Tue, Thu, Sat)',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    bio: 'Dr. Shazia Malik specializes in managing high-risk pregnancies, laparoscopic gynecological procedures, and reproductive endocrinology. She has successfully brought comfort to thousands of families in Bengaluru.',
    availability: {
      days: ['Tue', 'Thu', 'Sat'],
      slots: ['11:00 AM', '11:45 AM', '12:30 PM', '01:15 PM', '02:00 PM', '02:45 PM']
    }
  },
  {
    id: 'dr-sameer-shah',
    name: 'Dr. Sameer Shah',
    specialtyId: 'orthopedics',
    specialtyName: 'Orthopedics & Joint Care',
    role: 'Head of Orthopedic Surgery',
    degree: 'MBBS, MS (Orthopedics) - AIIMS New Delhi',
    experience: 12,
    consultationHours: '02:00 PM - 05:00 PM (Mon, Tue, Thu)',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    bio: 'Dr. Sameer Shah is a highly experienced joint replacement surgeon who trained at AIIMS, New Delhi. He specializes in knee and hip replacements, arthroscopies, and complex fractures.',
    availability: {
      days: ['Mon', 'Tue', 'Thu'],
      slots: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']
    }
  },
  {
    id: 'dr-nighat-ara',
    name: 'Dr. Nighat Ara',
    specialtyId: 'pediatrics',
    specialtyName: 'Pediatrics & Neonatology',
    role: 'Chief Pediatrician',
    degree: 'MBBS, MD (Pediatrics) - KIMS Bangalore',
    experience: 16,
    consultationHours: '10:00 AM - 01:00 PM (Mon, Tue, Wed, Thu)',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300',
    bio: 'With over 16 years of child healthcare service, Dr. Nighat Ara is a trusted name in Bangalore for pediatric development, critical respiratory concerns, and intensive neonatal supervision (NICU).',
    availability: {
      days: ['Mon', 'Tue', 'Wed', 'Thu'],
      slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM']
    }
  },
  {
    id: 'dr-tariq-mir',
    name: 'Dr. Tariq Mir',
    specialtyId: 'surgery',
    specialtyName: 'General & Laparoscopic Surgery',
    role: 'Senior Surgeon',
    degree: 'MBBS, MS (Surgery), FMAS (Laparoscopic Surgery) - Bangalore',
    experience: 15,
    consultationHours: '01:00 PM - 04:30 PM (Wed, Thu, Fri)',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    bio: 'Dr. Tariq Mir is an expert in keyhole/laparoscopic surgeries. His surgical precision makes him a highly recommended doctor for appendicial, gall bladder, and hernia procedures in Bengaluru.',
    availability: {
      days: ['Wed', 'Thu', 'Fri'],
      slots: ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM']
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Mohammad Farooq',
    location: 'Srinagar, Bangalore',
    rating: 5,
    text: 'Dr. Farooq Bhat on the cardiology panel gave me a lease on life during my cardiac crisis. The speed of the Cath Lab activation at Vinayaka Hospital was stellar.',
    date: 'April 2026'
  },
  {
    id: 't2',
    author: 'Saima Rashid',
    location: 'Ramanjaneya Road, Srinagar, Bangalore',
    rating: 5,
    text: 'I delivered my baby boy in the maternity suite here. The nurses and Dr. Shazia Malik were incredibly gentle, professional, and patient with me throughout.',
    date: 'May 2026'
  },
  {
    id: 't3',
    author: 'Abdul Rashid Rather',
    location: 'Banashankari, Bangalore',
    rating: 5,
    text: 'After years of knee pain, Dr. Sameer Shah performed knee replacement surgery on both legs. Today, I can easily walk without assistance around Srinagar, Bangalore.',
    date: 'March 2026'
  }
];

export const EMERGENCY_CONTACT = '080-26422325';
export const GENERAL_DESK = '080-26725225';
export const ADDRESS = 'No. 3/1, Ramanjaneya Road, Srinagar, Banashankari, Bengaluru, Karnataka - 560050';
export const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3073746683535!2d77.553956411227!3d12.952225315263658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3e18374d6e9f%3A0xc39bc1ba30ecdb82!2sVinayaka%20Hospital!5e0!3m2!1sen!2sin!4v1717348000000';
