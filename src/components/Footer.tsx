/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HeartPulse, ShieldAlert, CheckCircle2, Globe, ArrowUp } from 'lucide-react';
import { ADDRESS, GENERAL_DESK } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Logo Brand Descriptor (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-2xl">
                <HeartPulse className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight uppercase">Vinayaka Hospital</span>
                <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Srinagar, Bangalore</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
              We stand as a modular sanctuary of clinical health in Srinagar, Bangalore, providing 24/7 Red-Zone trauma admissions, pediatric neonatology supervisions, and interventional cardiology treatments.
            </p>

            {/* Temporary configuration metrics block as requested */}
            <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4 space-y-2 max-w-sm">
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>Active Temporary Domain IP</span>
              </span>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Applet is mapped locally with developer alias <strong className="text-white">vinayakahospital.local</strong> routing to <strong className="text-blue-400">localhost:3000</strong>.
              </p>
            </div>
          </div>

          {/* Quick Links Menu (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Patient Portal Links
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold font-sans">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-blue-400 transition-colors">
                  Home Portal View
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('departments')} className="hover:text-blue-400 transition-colors">
                  Medical Specialties
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('doctors')} className="hover:text-blue-400 transition-colors">
                  Find a Specialist Doctor
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('appointments')} className="hover:text-blue-400 transition-colors">
                  Track Booked Sessions
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-blue-400 transition-colors">
                  Location & Map Details
                </button>
              </li>
            </ul>
          </div>

          {/* Medical Disclaimer Panel (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Clinical Quality Standards
            </h4>
            <div className="space-y-4 text-xs select-none">
              <div className="flex items-start gap-2 text-slate-400">
                <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-semibold">
                  Disclaimer: This is a fully operational application for scheduling sessions at Vinayaka Hospital, Srinagar, Bangalore. Timings shown are subject to change during emergencies. Always contact hospital hotlines for physical crises.
                </p>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <CheckCircle2 className="w-4.5 h-4.5 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-semibold">
                  Strictly follows NABH patient safety guidelines, maintaining sterile environments and computerized documentation records dynamically.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Domain Attribution & Legal copyright strip */}
      <div className="bg-slate-950/70 border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
          <p>
            &copy; {currentYear} Vinayaka Hospital Srinagar, Bangalore. All Rights Protected under clinical safety standards.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Host Alias: vinayakahospital.local</span>
            </span>
            <span>|</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="hover:text-white transition-colors uppercase tracking-wider text-[10px]"
            >
              Back to TOP ▲
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
