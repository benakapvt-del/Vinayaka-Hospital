/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  User, 
  MapPin, 
  Calendar, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  BadgeAlert, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { DEPARTMENTS, DOCTORS, TESTIMONIALS, EMERGENCY_CONTACT, GENERAL_DESK, ADDRESS } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import Departments from './components/Departments';
import Doctors from './components/Doctors';
import BookingForm from './components/BookingForm';
import AppointmentList from './components/AppointmentList';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>('');
  const [newBookingRef, setNewBookingRef] = useState<string>('');

  // Routing trigger: Navigate to Booking Form & Pre-fill Doctor
  const handleBookDoctor = (doctorId: string) => {
    const doc = DOCTORS.find(d => d.id === doctorId);
    if (doc) {
      setSelectedDoctorId(doctorId);
      setSelectedSpecialtyId(doc.specialtyId);
    }
    setNewBookingRef('');
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Routing trigger: Navigate to Booking Form & Pre-fill Specialty
  const handleBookSpecialty = (specialtyId: string) => {
    setSelectedSpecialtyId(specialtyId);
    setSelectedDoctorId('');
    setNewBookingRef('');
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Core callback when an appointment is successfully scheduled
  const handleBookingSuccess = (appt: any) => {
    setNewBookingRef(appt.bookingReference);
    // clear active pre-selections
    setSelectedDoctorId('');
    setSelectedSpecialtyId('');
    // pivot directly to My Appointments tab to view receipt
    setActiveTab('appointments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to Booking with no initial filters
  const handleDirectBook = () => {
    setSelectedDoctorId('');
    setSelectedSpecialtyId('');
    setNewBookingRef('');
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="v-hospital-app" className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Global Clinical Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setNewBookingRef('');
        }} 
        onBookClick={handleDirectBook} 
      />

      {/* Main Adaptive Page Content with fade transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="tab-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-16 pb-20"
            >
              {/* Animated Hero Canvas */}
              <Hero 
                onBookClick={handleDirectBook}
                onExploreDoctors={() => setActiveTab('doctors')}
                onExploreSpecialties={() => setActiveTab('departments')}
              />

              {/* Srinagar, Bangalore Hospital Value Statement Card */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl translate-x-12 -translate-y-12" />
                  <div className="relative grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-4">
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest">
                        NABH Accredited Healthcare
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Experience Premium Medical Care & Healing
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                        Vinayaka Hospital, Srinagar, Bangalore coordinates closely with advanced healthcare panels, ensuring clinical perfection and sanitization standards are met. From critical coronary interventions to Level-III baby incubations, your family stays protected in South Bengaluru.
                      </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col justify-center gap-4">
                      <button
                        onClick={handleDirectBook}
                        className="bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-lg"
                      >
                        Launch OPD Appointment Wizard
                      </button>
                      <a
                        href={`tel:${GENERAL_DESK}`}
                        className="border border-slate-700 hover:bg-slate-800 text-slate-100 font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Reception: {GENERAL_DESK}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Specialties Preview Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                  <div className="space-y-2">
                    <span className="text-xs text-teal-700 font-bold uppercase tracking-wider block">Clinical Services</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Our Specialties Highlights</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('departments')}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:translate-x-1 transition-all flex items-center gap-1 underline underline-offset-4"
                  >
                    <span>View all departments & clinical procedures</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {DEPARTMENTS.slice(0, 3).map((dept) => (
                    <div 
                      key={dept.id} 
                      className="bg-white p-6 rounded-3xl border border-slate-100/70 shadow-xs hover:shadow-xl hover:shadow-slate-100/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Beds Mapped: {dept.bedCount || '20'}+
                        </span>
                        <h4 className="text-lg font-extrabold text-slate-900">{dept.name}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          {dept.shortDescription}
                        </p>
                      </div>
                      <button
                        onClick={() => handleBookSpecialty(dept.id)}
                        className="mt-6 text-xs text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Consult Specialty Department</span>
                        <span>➔</span>
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Srinagar, Bangalore Doctors Panel Call-Out Section */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-100/50 rounded-3xl border border-slate-200/50">
                <div className="grid lg:grid-cols-12 gap-8 items-center py-6">
                  <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Specialist Doctors Panel
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      Consult with Premier Clinical Minds
                    </h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto lg:mx-0 font-medium leading-relaxed">
                      Our physicians carry certifications from elite medical units like Bangalore Medical College (BMCRI), KIMS, and AIIMS. Explore clinical bios and find corresponding slots easily.
                    </p>
                    <button
                      onClick={() => setActiveTab('doctors')}
                      className="inline-flex items-center gap-1 text-xs bg-slate-900 text-slate-50 font-bold py-3 px-5 rounded-xl hover:bg-blue-600 mt-2 transition-all"
                    >
                      <span>Explore Doctors Panel Directory</span>
                    </button>
                  </div>
                  
                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                    {DOCTORS.slice(0, 2).map((doc) => (
                      <div key={doc.id} className="bg-white border rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all">
                        <div className="h-44 bg-slate-50 relative">
                           <img
                             src={doc.imageUrl}
                             alt={doc.name}
                             referrerPolicy="no-referrer"
                             className="w-full h-full object-cover object-top brightness-95"
                           />
                        </div>
                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-[10px] text-blue-600 font-bold">{doc.specialtyName}</span>
                            <h4 className="text-base font-extrabold text-slate-950">{doc.name}</h4>
                            <p className="text-[11px] text-slate-500 font-bold">{doc.degree}</p>
                          </div>
                          <button
                            onClick={() => handleBookDoctor(doc.id)}
                            className="w-full bg-slate-50 text-slate-900 hover:bg-blue-600 hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors tracking-wider text-center"
                          >
                            Reserve Slot Session
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Trust Indicators / Testimonials Area */}
              <section className="bg-white border-y border-slate-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                    <span className="text-xs text-blue-700 font-bold uppercase tracking-wider block">Patient Stories</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Trusted by Bangalore Families</h3>
                    <p className="text-sm text-slate-500 font-medium">Read true reviews from individuals who recovered under our clinical safety protocols in Srinagar, Bangalore.</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                    {TESTIMONIALS.map((t) => (
                      <div key={t.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                            "{t.text}"
                          </p>
                        </div>
                        <div className="pt-6 mt-6 border-t border-slate-200/50 flex justify-between items-center text-xs">
                          <div>
                            <strong className="block text-slate-900 font-bold">{t.author}</strong>
                            <span className="text-slate-500 font-medium">{t.location}</span>
                          </div>
                          <span className="text-slate-400 font-semibold">{t.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {activeTab === 'departments' && (
            <motion.div
              key="tab-departments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Departments onBookDepartment={handleBookSpecialty} />
            </motion.div>
          )}

          {activeTab === 'doctors' && (
            <motion.div
              key="tab-doctors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Doctors 
                onBookDoctor={handleBookDoctor} 
                selectedSpecialtyFilter={selectedSpecialtyId || 'all'}
              />
            </motion.div>
          )}

          {activeTab === 'book' && (
            <motion.div
              key="tab-book"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <BookingForm 
                initialDoctorId={selectedDoctorId} 
                initialSpecialtyId={selectedSpecialtyId}
                onBookingSuccess={handleBookingSuccess}
                onSecondaryAction={() => {
                  setSelectedDoctorId('');
                  setSelectedSpecialtyId('');
                  setActiveTab('doctors');
                }}
              />
            </motion.div>
          )}

          {activeTab === 'appointments' && (
            <motion.div
              key="tab-appointments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AppointmentList 
                onGoToBooking={handleDirectBook} 
                newBookingReference={newBookingRef} 
              />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="tab-contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Comprehensive Footer Accent */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
