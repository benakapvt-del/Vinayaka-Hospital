/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { ADDRESS, EMERGENCY_CONTACT, GENERAL_DESK, GOOGLE_MAPS_EMBED } from '../data';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Kindly fill in all the inquiry inputs to submit.');
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact-directions-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Reach Us Anytime
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact & Directions
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium">
            Find directions to our Srinagar, Bangalore clinical site, browse emergency contacts, or write an immediate clinical inquiry to our admin.
          </p>
        </div>

        {/* Core Layout Splitter */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Column 1: Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Card A: Location Address */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl shrink-0 h-fit border border-blue-100">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-slate-900">Hospital Site Address</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Our Bangalore Location</p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {ADDRESS}
                  </p>
                </div>
              </div>

              {/* Card B: Telephone Directories */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl shrink-0 h-fit border border-blue-100">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-slate-900">Calling Extensions</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Help desks & Ambulance</p>
                  <div className="space-y-1.5 text-sm text-slate-600 font-medium">
                    <p className="flex justify-between gap-4">
                      <span>Emergency Care Unit:</span>
                      <strong className="text-rose-600">{EMERGENCY_CONTACT}</strong>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>General Helpdesk Desk:</span>
                      <strong className="text-slate-800">{GENERAL_DESK}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card C: Timing schedules */}
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex gap-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl shrink-0 h-fit border border-blue-100">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-base font-extrabold text-slate-900">Admissions & Timing</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Working Windows</p>
                  <p className="text-sm text-slate-700 font-semibold">
                    OPD: 09:00 AM - 05:00 PM (Mon-Sat)
                  </p>
                  <p className="text-[11px] text-rose-600 font-bold uppercase tracking-wide">
                    * Emergency, IPD Admission & Trauma Care: 24 Hours / 365 Days
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Map representation placeholder/embed */}
            <div className="relative h-44 rounded-3xl bg-slate-100 border overflow-hidden shadow-inner mt-4">
              <iframe
                title="Vinayaka Hospital location map"
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 grayscale contrast-[1.1] opacity-90"
              />
            </div>
          </div>

          {/* Column 2: Interactive inquiry form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-slate-900">Inquiry Received Successfully</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-semibold">
                    We appreciate your contact! A representative from the Vinayaka Hospital administrative team will get back to your email within 12 working hours.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer underline underline-offset-4"
                >
                  Write another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Submit an Inquiry</h3>
                  <p className="text-xs text-slate-500 font-medium">Any administrative question? Write to us directly and safely.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest block font-sans">Sender Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bilal Ahmad"
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:outline-none rounded-xl py-2.5 px-4 font-semibold text-slate-800 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest block font-sans">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. bilal@gmail.com"
                      className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:outline-none rounded-xl py-2.5 px-4 font-semibold text-slate-800 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-800 uppercase tracking-widest block font-sans">Inquiry / Message Notes</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details of your clinical support requirement, insurance questions, diagnostic requests, or general grievances..."
                    rows={4}
                    className="w-full bg-white border border-slate-200 focus:border-blue-500 focus:outline-none rounded-xl p-4 font-semibold text-slate-800 text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 hover:text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Administration Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
