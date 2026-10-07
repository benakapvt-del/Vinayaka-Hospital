/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Activity, 
  Sparkles, 
  Baby, 
  ShieldAlert, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { DEPARTMENTS } from '../data';
import { Department } from '../types';

// Solid mapping of department icon names to actual Lucide component classes
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart: Heart,
  Activity: Activity,
  Sparkles: Sparkles,
  Baby: Baby,
  ShieldAlert: ShieldAlert,
  Stethoscope: Stethoscope,
};

interface DepartmentsProps {
  onBookDepartment: (deptId: string) => void;
}

export default function Departments({ onBookDepartment }: DepartmentsProps) {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="departments-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-750 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Center of Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Our Medical Specialties
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-medium font-sans">
            At Vinayaka Hospital, Srinagar, Bangalore, we provide tailored medical services powered by advanced technologies and empathetic caregivers.
          </p>
        </div>

        {/* Division into Main List vs Detail Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Department Cards */}
          <div className={`${selectedDept ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {DEPARTMENTS.map((dept) => {
                const IconComponent = iconMap[dept.iconName] || Stethoscope;
                const isSelected = selectedDept?.id === dept.id;

                return (
                  <motion.div
                    key={dept.id}
                    variants={itemVariants}
                    onClick={() => setSelectedDept(dept)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border h-full flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-blue-50/50 border-blue-500 shadow-md shadow-blue-500/5 ring-1 ring-blue-500' 
                        : 'bg-white hover:shadow-sm border-slate-200'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className={`p-2 rounded-lg w-fit ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Text */}
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-850 text-slate-900">{dept.name}</h3>
                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                          Active Bed Capacity: {dept.bedCount || '20'}+
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium pt-2 line-clamp-3">
                          {dept.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Footer Trigger Link */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-200/50">
                      <span className="text-xs font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                        View Procedures & Treatments <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Detail Box: Active Department Details */}
          {selectedDept && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] space-y-6 sticky top-28 lg:h-auto shadow-2xl"
            >
              {/* Header Details */}
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Detailed Scope
                  </span>
                  <h3 className="text-2xl font-black text-slate-900">{selectedDept.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedDept(null)}
                  className="p-1 text-slate-400 hover:text-slate-605 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors text-xs font-bold"
                >
                  Close
                </button>
              </div>

              {/* Comprehensive Description text */}
              <p className="text-sm text-slate-500 leading-relaxed font-sans">
                {selectedDept.detailedDescription}
              </p>

              {/* Treatments & Offerings list */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">
                  Specialized Clinical Procedures
                </h4>
                <ul className="space-y-2.5">
                  {selectedDept.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Booking Catalyst Button */}
              <div className="pt-6 border-t border-slate-200/60 flex flex-col gap-3">
                <button
                  onClick={() => onBookDepartment(selectedDept.id)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-full hover:bg-blue-750 transition-colors shadow-lg shadow-blue-200 active:scale-95 text-sm"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Book {selectedDept.name} Appointment</span>
                </button>
                <p className="text-[11px] text-slate-400 font-semibold text-center">
                  Consultation timings match individual specialist schedules.
                </p>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
