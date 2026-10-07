/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeartPulse, Phone, Menu, X, Calendar, Globe, Clock } from 'lucide-react';
import { EMERGENCY_CONTACT } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBookClick: () => void;
}

export default function Header({ activeTab, setActiveTab, onBookClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Specialties', id: 'departments' },
    { label: 'Our Doctors', id: 'doctors' },
    { label: 'My Appointments', id: 'appointments' },
    { label: 'Contact & Directions', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Dynamic Temporary Domain Banner */}
      <div id="domain-banner" className="bg-slate-900 text-slate-100 text-xs py-2 px-4 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>
            Development Host IP: <strong className="text-blue-300">http://localhost:3000</strong>
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline">
            Client Server Alias: <strong className="text-blue-300">vinayakahospital.local</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-blue-400">Temporary Domain Live</span>
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Clock className="w-3 h-3 text-slate-400" />
            Srinagar, Bangalore (UTC+5:30)
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav id="nav-bar" className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* Logo and Hospital Branding */}
            <div 
              id="brand-logo" 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:bg-blue-700 transition-all duration-300">
                V
              </div>
              <div>
                <h1 className="font-bold text-lg text-slate-850 tracking-tight leading-tight">Vinayaka Hospital</h1>
                <p className="text-[10px] uppercase tracking-widest text-blue-600 font-semibold">Srinagar, Bangalore</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[15px] font-medium transition-colors py-2 relative ${
                    activeTab === item.id 
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${EMERGENCY_CONTACT}`}
                className="flex items-center gap-2 text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition-all duration-200 text-sm font-semibold border border-rose-100"
              >
                <Phone className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
                <span>Emergency Desk</span>
              </a>
              <button
                id="header-book-btn"
                onClick={onBookClick}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-full transition-colors font-semibold shadow-lg shadow-blue-200 text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-3">
              <a 
                href={`tel:${EMERGENCY_CONTACT}`}
                className="p-2.5 text-rose-600 bg-rose-50 rounded-xl"
                aria-label="Call Emergency Desk"
              >
                <Phone className="w-5 h-5 fill-rose-600" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-150 py-4 px-4 shadow-inner space-y-3 lg:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100 my-4" />
            <div className="space-y-4 pt-2">
              <button
                onClick={() => {
                  onBookClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3.5 rounded-full text-base font-bold text-center hover:bg-blue-700 shadow-md shadow-blue-100 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
