/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Clock, Heart, Award, ArrowRight, Filter } from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data';
import { Doctor } from '../types';

interface DoctorsProps {
  onBookDoctor: (doctorId: string) => void;
  selectedSpecialtyFilter?: string;
}

export default function Doctors({ onBookDoctor, selectedSpecialtyFilter = 'all' }: DoctorsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState(selectedSpecialtyFilter);

  // Sync state if prop changes
  React.useEffect(() => {
    if (selectedSpecialtyFilter) {
      setSpecialtyFilter(selectedSpecialtyFilter);
    }
  }, [selectedSpecialtyFilter]);

  // Compute filtered doctor listing
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.degree.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = specialtyFilter === 'all' || doc.specialtyId === specialtyFilter;

      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, specialtyFilter]);

  return (
    <section id="doctors-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Clinical Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Medical Specialists
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium">
            Highly qualified clinical leaders, surgeons, and maternal healthcare physicians bringing national and global expertise to Srinagar, Bangalore.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200 max-w-5xl mx-auto mb-12">
          <div className="grid md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input Box */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff, degrees, bio or specialty..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none rounded-2xl text-slate-800 font-medium text-sm transition-all"
              />
            </div>

            {/* Specialty Filter Dropdown */}
            <div className="md:col-span-4 relative flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:outline-none rounded-2xl py-3.5 px-4 text-slate-800 font-medium text-sm transition-all"
              >
                <option value="all">All Medical Specialties</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Helper Clear Button */}
            <div className="md:col-span-2 text-right">
              {(searchQuery || specialtyFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSpecialtyFilter('all');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Doctors Grid Container with Entry Animation */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl max-w-2xl mx-auto px-6 space-y-4">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              ?
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Specialists Found</h3>
            <p className="text-slate-500 text-sm font-medium">
              We couldn't find any specialist matching "<b>{searchQuery}</b>" in the selected filter. Try adjusting your vocabulary or check another department.
            </p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredDoctors.map((doc) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col justify-between hover:shadow-xl shadow-sm transition-all duration-300"
                >
                  {/* Photo & Key Overview Portion */}
                  <div className="space-y-6">
                    {/* Cover Photo */}
                    <div className="relative h-64 bg-slate-100 group overflow-hidden">
                      <img
                        src={doc.imageUrl}
                        alt={doc.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-500 brightness-95"
                      />
                      {/* Rating Overlaid Tag */}
                      <span className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm border border-slate-100/50">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{doc.rating}</span>
                      </span>
                      {/* Experience indicator overlaid header */}
                      <span className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-extrabold text-white">
                        {doc.experience} Years of Care
                      </span>
                    </div>

                    {/* Meta details segment */}
                    <div className="px-6 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-xs bg-blue-50 text-blue-800 font-extrabold px-3 py-1 rounded-full w-fit inline-block">
                          {doc.specialtyName}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 pt-1 tracking-tight leading-tight">{doc.name}</h3>
                        <p className="text-xs text-blue-700 font-bold tracking-wide flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{doc.degree}</span>
                        </p>
                      </div>

                      {/* Brief description bio */}
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        {doc.bio}
                      </p>

                      {/* Consultation timing rows */}
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-start gap-2 text-xs text-slate-600">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-slate-800 font-bold">Consultation Timings:</strong>
                          <span className="font-semibold">{doc.consultationHours}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Footer action bar */}
                  <div className="p-6 border-t border-slate-200 mt-6 bg-slate-50/50">
                    <button
                      onClick={() => onBookDoctor(doc.id)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 text-slate-50 hover:bg-blue-600 hover:text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-colors cursor-pointer group"
                    >
                      <span>Book Consultation Session</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
