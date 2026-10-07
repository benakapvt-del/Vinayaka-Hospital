/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, Stethoscope, User, HelpCircle, Phone, Mail, FileText, Check, AlertCircle, Info, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data';
import { Appointment, Doctor } from '../types';

interface BookingFormProps {
  initialDoctorId?: string;
  initialSpecialtyId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
  onSecondaryAction?: () => void; // e.g. navigate back to list
}

export default function BookingForm({ 
  initialDoctorId = '', 
  initialSpecialtyId = '', 
  onBookingSuccess,
  onSecondaryAction 
}: BookingFormProps) {
  // Navigation wizard step: 1 (Physician & Date), 2 (Patient Details), 3 (Summary Confirmation)
  const [step, setStep] = useState(1);

  // Form Fields
  const [specialtyId, setSpecialtyId] = useState(initialSpecialtyId);
  const [doctorId, setDoctorId] = useState(initialDoctorId);
  const [sessionDate, setSessionDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [priority, setPriority] = useState<'routine' | 'urgent' | 'emergency'>('routine');

  // Interactive Validation Alerts State
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [doctorCalendarInfo, setDoctorCalendarInfo] = useState<{ days: string[]; slots: string[] } | null>(null);

  // Sync initial values on launch / focus changes
  useEffect(() => {
    if (initialDoctorId) {
      const doc = DOCTORS.find(d => d.id === initialDoctorId);
      if (doc) {
        setDoctorId(initialDoctorId);
        setSpecialtyId(doc.specialtyId);
      }
    } else if (initialSpecialtyId) {
      setSpecialtyId(initialSpecialtyId);
      // clear doctor if it doesn't belong to the specialty
      const currentDoc = DOCTORS.find(d => d.id === doctorId);
      if (currentDoc && currentDoc.specialtyId !== initialSpecialtyId) {
        setDoctorId('');
      }
    }
  }, [initialDoctorId, initialSpecialtyId]);

  // Handle specialty dropdown change
  const handleSpecialtyChange = (id: string) => {
    setSpecialtyId(id);
    setDoctorId(''); // reset doctor selection
    setSessionDate('');
    setSelectedSlot('');
    setDoctorCalendarInfo(null);
  };

  // Filter doctors list based on selected specialty
  const eligibleDoctors = useMemo(() => {
    if (!specialtyId) return [];
    return DOCTORS.filter(doc => doc.specialtyId === specialtyId);
  }, [specialtyId]);

  // Handle doctor selection change to fetch their precise availability profile
  const handleDoctorChange = (id: string) => {
    setDoctorId(id);
    setSessionDate('');
    setSelectedSlot('');
    const doc = DOCTORS.find(d => d.id === id);
    if (doc) {
      setDoctorCalendarInfo(doc.availability);
      setSpecialtyId(doc.specialtyId); // sync department
    } else {
      setDoctorCalendarInfo(null);
    }
  };

  // Determine selectable date boundary (Today through 30 days ahead)
  const dateBoundaries = useMemo(() => {
    const todayStr = new Date().toISOString().substring(0, 10);
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const maxStr = futureDate.toISOString().substring(0, 10);
    return { min: todayStr, max: maxStr };
  }, []);

  // Validate step 1 parameters
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!specialtyId) errors.specialtyId = 'Please select a medical department.';
    if (!doctorId) errors.doctorId = 'Please select your preferred medical specialist.';
    if (!sessionDate) errors.sessionDate = 'Please select a consultation date.';
    if (!selectedSlot) errors.selectedSlot = 'Please select a preferred slot timing.';

    // Check if appointment day of week is supported by doctor
    if (sessionDate && doctorId) {
      const selectedDayName = new Date(sessionDate).toLocaleDateString('en-US', { weekday: 'short' });
      const doc = DOCTORS.find(d => d.id === doctorId);
      if (doc && !doc.availability.days.includes(selectedDayName)) {
        errors.sessionDate = `Selected specialist is not available on ${selectedDayName}. Available: ${doc.availability.days.join(', ')}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setStep(2);
  };

  // Validate step 2 parameters & build record
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!patientName.trim()) errors.patientName = 'Patient full name is required.';
    
    // Simple 10-digit phone checking
    const cleanerPhone = patientPhone.replace(/[^0-9]/g, '');
    if (!cleanerPhone || cleanerPhone.length < 10) {
      errors.patientPhone = 'Please provide a valid Indian contact number (10-digits).';
    }

    // Email check
    if (!patientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail)) {
      errors.patientEmail = 'Valid patient email address is required.';
    }

    const ageNum = parseInt(patientAge, 10);
    if (!patientAge || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      errors.patientAge = 'Please specify a valid patient age (1-120).';
    }

    if (!symptoms.trim()) errors.symptoms = 'Please summarize primary symptoms or reasons for consultation.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Validation is completely solid - construct full Appointment payload
    const selectedDocObject = DOCTORS.find(d => d.id === doctorId)!;
    const selectedDeptObject = DEPARTMENTS.find(dep => dep.id === specialtyId)!;
    
    // Gen Reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const compactDateComp = sessionDate.replace(/-/g, '');
    const referenceTag = `VH-SRN-${compactDateComp}-${randomSuffix}`;

    const parsedAppointmentObj: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      patientAge: ageNum,
      specialtyId,
      specialtyName: selectedDeptObject.name,
      doctorId,
      doctorName: selectedDocObject.name,
      date: sessionDate,
      timeSlot: selectedSlot,
      symptoms: symptoms.trim(),
      priority,
      bookingReference: referenceTag,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Save inside LocalStorage persistent chain
    const cachedStore = localStorage.getItem('vinayaka_appointments');
    const recordsList: Appointment[] = cachedStore ? JSON.parse(cachedStore) : [];
    recordsList.unshift(parsedAppointmentObj);
    localStorage.setItem('vinayaka_appointments', JSON.stringify(recordsList));

    // Callback back to parent state
    onBookingSuccess(parsedAppointmentObj);
  };

  return (
    <div id="booking-container" className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Visual Step Tracker Indicators */}
      <div className="flex justify-between items-center mb-10 max-w-sm mx-auto">
        <div className="flex flex-col items-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            1
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-wider mt-1 text-slate-500">Timing</span>
        </div>
        <div className={`flex-1 h-0.5 mx-2 bg-slate-200 ${step >= 2 ? 'bg-blue-600' : ''}`} />
        <div className="flex flex-col items-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
          }`}>
            2
          </div>
          <span className="text-[10px] uppercase font-extrabold tracking-wider mt-1 text-slate-500">Demographics</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 sm:p-8 space-y-6">
        
        {/* STEP 1: Select Specialty, Doctor, Date, and Slot */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Select Doctor & Preferred Schedule</h2>
              <p className="text-xs text-slate-500">Step 1 of 2: Configure clinical slot allocation</p>
            </div>

            {/* Specialty Selection Field */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                <span>Medical Specialty Department</span>
              </label>
              <select
                value={specialtyId}
                onChange={(e) => handleSpecialtyChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
              >
                <option value="">-- Choose Specialization Unit --</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {validationErrors.specialtyId && (
                <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{validationErrors.specialtyId}</span>
                </p>
              )}
            </div>

            {/* Doctor Selection Field */}
            {specialtyId && (
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preferred Healthcare Specialist</span>
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                >
                  <option value="">-- Select Specialist Physician --</option>
                  {eligibleDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} (Exp: {doc.experience} Yr)
                    </option>
                  ))}
                </select>
                {validationErrors.doctorId && (
                  <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.doctorId}</span>
                  </p>
                )}
              </div>
            )}

            {/* Interactive Display of Doctor's Availability */}
            {doctorId && doctorCalendarInfo && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-605 text-blue-600" />
                  <span>Physician Consultation Days & Availability:</span>
                </h4>
                <div className="text-[11px] text-blue-800 space-y-1">
                  <p>
                    <b>Practicing Days: </b> 
                    <span className="font-bold underline">{doctorCalendarInfo.days.join(', ')}</span>
                  </p>
                  <p>
                    <b>Daily OPD Timings: </b>
                    <span>Consultation slots are distributed strictly via queue. Please block early.</span>
                  </p>
                </div>
              </div>
            )}

            {/* Date and Time Slot Layout */}
            {doctorId && (
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {/* Date Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Preferred Visit Date</span>
                  </label>
                  <input
                    type="date"
                    value={sessionDate}
                    min={dateBoundaries.min}
                    max={dateBoundaries.max}
                    onChange={(e) => {
                      setSessionDate(e.target.value);
                      setSelectedSlot('');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                  />
                  {validationErrors.sessionDate && (
                    <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{validationErrors.sessionDate}</span>
                    </p>
                  )}
                  <span className="text-[10px] text-slate-500 font-medium block">
                    * Booking supported up to 30 days in advance
                  </span>
                </div>

                {/* Slots selection */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select Time Slot</span>
                  </label>
                  {sessionDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {doctorCalendarInfo?.slots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-3 border rounded-xl text-center text-xs font-semibold select-none transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-2.5 px-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-500 text-xs text-center">
                      Select date to unlock timings
                    </div>
                  )}
                  {validationErrors.selectedSlot && (
                    <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{validationErrors.selectedSlot}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 1 navigators */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              {onSecondaryAction ? (
                <button
                  type="button"
                  onClick={onSecondaryAction}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl transition-all"
                >
                  Back to Roster
                </button>
              ) : (
                <div />
              )}
              <button
                type="submit"
                disabled={!selectedSlot}
                className={`flex items-center gap-2 bg-slate-900 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all cursor-pointer ${
                  selectedSlot 
                    ? 'hover:bg-teal-600 active:scale-95' 
                    : 'opacity-50 cursor-not-allowed bg-slate-400'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Demographic Details */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Enter Patient Demographics & Bio</h2>
              <p className="text-xs text-slate-500">Step 2 of 2: Clinic admission details</p>
            </div>

            {/* Inputs grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Patient Full Name</span>
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Mohd Amin Shah"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                />
                {validationErrors.patientName && (
                  <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.patientName}</span>
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Patient Age (Years)</span>
                </label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 45"
                  min="1"
                  max="120"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                />
                {validationErrors.patientAge && (
                  <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.patientAge}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Contact Phone Number</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold border-r pr-2 border-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="9906XXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 pl-16 pr-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                  />
                </div>
                {validationErrors.patientPhone && (
                  <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.patientPhone}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="patient@gmail.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl py-3 px-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
                />
                {validationErrors.patientEmail && (
                  <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{validationErrors.patientEmail}</span>
                  </p>
                )}
              </div>

            </div>

            {/* Consultation Priority Selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                <span>Urgency / Consultation Priority Level</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['routine', 'urgent', 'emergency'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPriority(lvl)}
                    className={`py-2.5 px-2.5 border rounded-xl font-bold uppercase tracking-wider text-[11px] text-center select-none transition-all cursor-pointer ${
                      priority === lvl
                        ? lvl === 'routine' ? 'bg-blue-650 bg-blue-600 text-white border-blue-600 shadow-sm' 
                        : lvl === 'urgent' ? 'bg-amber-600 text-white border-amber-600 font-black shadow-sm'
                        : 'bg-rose-600 text-white border-rose-600 font-extrabold animate-pulse'
                        : 'bg-slate-50 hover:bg-slate-105 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms Description */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Primary Symptoms / Reason of OPD Consultation</span>
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Kindly elaborate medical complaints, timeline of symptoms or active illness details..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl p-4 font-semibold text-slate-800 text-sm transition-all focus:outline-none"
              />
              {validationErrors.symptoms && (
                <p className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{validationErrors.symptoms}</span>
                </p>
              )}
            </div>

            {/* Step 2 action hooks */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 border border-transparent font-bold py-3 text-sm rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Timing</span>
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-4 px-8 rounded-xl text-base transition-all cursor-pointer shadow-md shadow-blue-500/15"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Book Vital Session</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
