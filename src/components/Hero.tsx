/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Activity, Calendar, Star, Phone } from 'lucide-react';
import { EMERGENCY_CONTACT } from '../data';

interface HeroProps {
  onBookClick: () => void;
  onExploreDoctors: () => void;
  onExploreSpecialties: () => void;
}

export default function Hero({ onBookClick, onExploreDoctors, onExploreSpecialties }: HeroProps) {
  return (
    <section id="hero-section" className="relative bg-white overflow-hidden min-h-[72vh] flex items-center shrink-0">
      {/* Decorative ambient background curves */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/8 left-10 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text/Content Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Accreditation Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            >
              <ShieldCheck className="w-4 h-4 text-blue-750" />
              <span className="font-bold tracking-wider">
                Leading Healthcare in Kashmir
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl font-extrabold text-slate-905 text-slate-950 leading-[1.1]"
              >
                World-Class Care, <br />
                <span className="text-blue-600 relative">
                  Close to Heart.
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-500 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Providing comprehensive medical excellence with advanced technology and compassionate care in Srinagar, Bangalore.
              </motion.p>
            </div>

            {/* Quick Actions Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onBookClick}
                className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-xl hover:bg-slate-800 transition-all cursor-pointer text-sm"
              >
                Book Consultation
              </button>
              
              <button
                onClick={onExploreSpecialties}
                className="border-2 border-slate-205 border-slate-200 text-slate-600 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-all cursor-pointer text-sm"
              >
                Our Facilities
              </button>
            </motion.div>

            {/* Grid of Key Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 xl:gap-6 pt-4 border-t border-slate-200/50"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Cardiology</h4>
                  <p className="text-xs text-slate-500 mt-1">Advanced heart care units.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Orthopedic</h4>
                  <p className="text-xs text-slate-500 mt-1">Bone and joint surgery.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 col-span-2 md:col-span-1">
                <div className="p-2 bg-teal-50 rounded-lg text-teal-600 shrink-0">
                  <Star className="w-5 h-5 fill-teal-500 stroke-teal-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Neurology</h4>
                  <p className="text-xs text-slate-500 mt-1">Expert brain specialists.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Visual Column (Modern Medical Display with Srinagar, Bangalore context) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-[440px] lg:max-w-none"
            >
              {/* Outer Glow Block */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-3xl transform rotate-3" />

              {/* Main Medical Illustration Box */}
              <div className="relative bg-white border border-slate-100 rounded-[2rem] p-4 sm:p-6 shadow-2xl space-y-6 overflow-hidden">
                {/* Visual Image Banner of Srinagar, Bangalore Landmarks */}
                <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&q=80&w=600" 
                    alt="Vinayaka Hospital Srinagar Bangalore" 
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Serving Srinagar, Bangalore
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">Vinayaka Hospital</h3>
                      <p className="text-[11px] text-slate-300 font-medium">No. 3/1, Ramanjaneya Road, Srinagar, Bangalore</p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats Board inside */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-2xl font-black text-slate-900">40+</span>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Specialists</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-2xl font-black text-blue-600">120+</span>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Beds Capacity</span>
                  </div>
                </div>

                {/* Direct Emergency Contact Box */}
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-500 text-white rounded-xl1 block rounded-xl">
                      <Phone className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="block text-[11px] text-rose-600 font-bold uppercase tracking-wider">Emergency Hotline</span>
                      <span className="text-base font-extrabold text-rose-950">{EMERGENCY_CONTACT}</span>
                    </div>
                  </div>
                  <a 
                    href={`tel:${EMERGENCY_CONTACT}`} 
                    className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-3.5 rounded-xl transition-colors shrink-0"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* Patient Badge Accent */}
              <div className="absolute -bottom-2 -left-2 bg-white border border-slate-100 rounded-2xl card p-4 w-24 h-24 shadow-lg flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-blue-600">24/7</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Support</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
