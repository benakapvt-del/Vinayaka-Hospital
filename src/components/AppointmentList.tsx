/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, CheckCircle2, XCircle, AlertCircle, Trash2, Printer, Search, Download } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentListProps {
  onGoToBooking: () => void;
  newBookingReference?: string;
}

export default function AppointmentList({ onGoToBooking, newBookingReference }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedRef, setFocusedRef] = useState<string | null>(newBookingReference || null);

  // Load appointments from LocalStorage
  const loadAppointments = () => {
    const cachedStore = localStorage.getItem('vinayaka_appointments');
    if (cachedStore) {
      setAppointments(JSON.parse(cachedStore));
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Sync focusedRef if changed from props
  useEffect(() => {
    if (newBookingReference) {
      setFocusedRef(newBookingReference);
    }
  }, [newBookingReference]);

  // Cancel an appointment with real state and LocalStorage propagation
  const handleCancelAppointment = (id: string, refTag: string) => {
    if (window.confirm(`Are you absolutely sure you want to cancel appointment ${refTag}?`)) {
      const cachedStore = localStorage.getItem('vinayaka_appointments');
      if (cachedStore) {
        let list: Appointment[] = JSON.parse(cachedStore);
        // Find index and update status to cancelled
        list = list.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt);
        localStorage.setItem('vinayaka_appointments', JSON.stringify(list));
        setAppointments(list);
      }
    }
  };

  // Completely delete a canceled/old appointment record from view
  const handleDeleteAppointmentRecord = (id: string) => {
    const list = appointments.filter(apt => apt.id !== id);
    localStorage.setItem('vinayaka_appointments', JSON.stringify(list));
    setAppointments(list);
    if (focusedRef && !list.some(apt => apt.bookingReference === focusedRef)) {
      setFocusedRef(null);
    }
  };

  // Filter list matching searches
  const filteredAppointments = appointments.filter(apt => {
    const query = searchQuery.toLowerCase();
    return apt.patientName.toLowerCase().includes(query) || 
           apt.bookingReference.toLowerCase().includes(query) ||
           apt.doctorName.toLowerCase().includes(query) ||
           apt.specialtyName.toLowerCase().includes(query);
  });

  // Handle mock printing / exporting of summary tickets
  const handlePrintReceipt = (apt: Appointment) => {
    const printContent = `
========================================
     VINAYAKA HOSPITAL SRINAGAR
========================================
        APPOINTMENT TICKET
  
Reference ID:  ${apt.bookingReference}
Session Date:  ${apt.date}
Time Slot:     ${apt.timeSlot}
Priority:      ${apt.priority.toUpperCase()}
Status:        ${apt.status.toUpperCase()}

----- PHYSICIAN DETAILS -----
Specialty:     ${apt.specialtyName}
Doctor Panel:  ${apt.doctorName}

----- PATIENT DEMOGRAPHICS -----
Patient Name:  ${apt.patientName}
Age:           ${apt.patientAge} Years Old
Contact:       +91 ${apt.patientPhone}
Email:         ${apt.patientEmail}

----- CLINICAL BIO -----
Active Complaints: ${apt.symptoms}

========================================
Temporary Dev Host IP: localhost:3000
Assigned Alias: vinayakahospital.local
========================================
    * Please report 15 mins prior.
    `;
    
    // Fallback console log print plus user prompt
    const blob = new Blob([printContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medical_receipt_${apt.bookingReference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert(`Medical appointment ticket details for patient ${apt.patientName} have been downloaded as a text file.`);
  };

  return (
    <div id="appointments-tracking-page" className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Your Appointment Panel</h2>
          <p className="text-sm text-slate-500 font-medium">Review, track, download or cancel upcoming OPD consultations.</p>
        </div>
        <button
          onClick={onGoToBooking}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/10"
        >
          Book New Consultation
        </button>
      </div>

      {focusedRef && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3.5"
        >
          <CheckCircle2 className="w-5.5 h-5.5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-blue-900">Confirmed Booking Focus Activated</h4>
            <p className="text-xs text-blue-800 leading-relaxed font-semibold">
              Your appointment is saved. Reference Key: <strong className="font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-950">{focusedRef}</strong>.
              Present this key at the Vinayaka Hospital reception desk upon arrival.
            </p>
            <button
              onClick={() => setFocusedRef(null)}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline mt-1.5"
            >
              Dismiss alert filter
            </button>
          </div>
        </motion.div>
      )}

      {/* Roster Empty State */}
      {appointments.length === 0 ? (
        <div className="text-center py-24 bg-white border border-slate-100 rounded-3xl p-10 space-y-5">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Clock className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">No Consultation History Yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">
              You haven't scheduled any healthcare sessions under this browser session. Book below to start.
            </p>
          </div>
          <button
            onClick={onGoToBooking}
            className="inline-flex items-center gap-2 bg-slate-950 text-white font-bold py-3.5 px-6 rounded-xl text-sm hover:bg-blue-600 transition-colors shadow-lg"
          >
            <span>Book Doctor Consultation</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Quick Search Filtering Tool */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by physician, patient name, or reference keys..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-slate-800 font-semibold text-sm transition-all focus:outline-none"
            />
          </div>

          {/* Table / List representation */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAppointments.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-10 bg-white border rounded-2xl">
                  No matching appointments found for "<b>{searchQuery}</b>".
                </p>
              ) : (
                filteredAppointments.map((apt) => {
                  const isCancelled = apt.status === 'cancelled';
                  const isPriorityUrgent = apt.priority !== 'routine';

                  return (
                    <motion.div
                      key={apt.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -50 }}
                      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
                        focusedRef === apt.bookingReference 
                          ? 'border-blue-500 shadow-md shadow-blue-500/5 ring-1 ring-blue-500' 
                          : 'border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/30'
                      }`}
                    >
                      {/* Ticket grid */}
                      <div className="grid md:grid-cols-12 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {/* Highlights (Date, Time, reference) */}
                        <div className="md:col-span-4 p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <span className="text-[10px] bg-slate-200 text-slate-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-widest font-mono">
                              REF: {apt.bookingReference}
                            </span>
                            <div className="flex items-center gap-2 text-slate-700 font-black text-sm pt-2">
                              <Calendar className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                              <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-bold text-xs">
                              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                              <span>{apt.timeSlot}</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            {/* Urgent status badging */}
                            {isCancelled ? (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                                <XCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>Cancelled</span>
                              </span>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  <span>Active</span>
                                </span>
                                {apt.priority === 'urgent' && (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                                    Urgent Care
                                  </span>
                                )}
                                {apt.priority === 'emergency' && (
                                  <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2.5 py-1 rounded-full uppercase animate-pulse">
                                    Severe Red Zone
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Core medical variables */}
                        <div className="md:col-span-8 p-6 flex flex-col justify-between space-y-5">
                          <div className="grid sm:grid-cols-2 gap-4">
                            {/* Doctor Panels Details */}
                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">OPD Specialist</span>
                              <h4 className="text-base font-extrabold text-slate-900">{apt.doctorName}</h4>
                              <p className="text-xs text-slate-500 font-semibold">{apt.specialtyName}</p>
                            </div>

                            {/* Patient admission parameters */}
                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Patient Credentials</span>
                              <h4 className="text-base font-extrabold text-slate-900">{apt.patientName}</h4>
                              <p className="text-xs text-slate-500 font-semibold">
                                Age: {apt.patientAge} Yrs | Phone: +91 {apt.patientPhone}
                              </p>
                            </div>
                          </div>

                          {/* Complaints list */}
                          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100/50">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block mb-1">Illness Notes</span>
                            <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                              "{apt.symptoms}"
                            </p>
                          </div>

                          {/* Options action toolbar */}
                          <div className="flex justify-between items-center pt-4 border-t border-slate-200/50">
                            <div>
                              {!isCancelled && (
                                <button
                                  onClick={() => handleCancelAppointment(apt.id, apt.bookingReference)}
                                  className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer hover:underline transition-colors block"
                                >
                                  Cancel OPD Consultation
                                </button>
                              )}
                              {isCancelled && (
                                <button
                                  onClick={() => handleDeleteAppointmentRecord(apt.id)}
                                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-600 font-bold cursor-pointer transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Erase from Log</span>
                                </button>
                              )}
                            </div>
                            
                            <button
                              onClick={() => handlePrintReceipt(apt)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 rounded-xl text-xs text-slate-700 font-extrabold tracking-wide transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Get Ticket PDF</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

    </div>
  );
}
