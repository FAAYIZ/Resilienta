import React from 'react';
import { Phone, ShieldAlert, Heart, Eye } from 'lucide-react';
import { HELPLINES } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-brand-border text-brand-muted py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Direct Hotline Cards */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-4 flex items-center space-x-2">
            <ShieldAlert className="h-4 w-4 text-red-500 animate-pulse" />
            <span>24/7 Professional Crisis Support Hotlines</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HELPLINES.map((line, idx) => (
              <a
                key={`line-${idx}`}
                href={line.href}
                className="flex items-start space-x-3.5 p-4 rounded-xl bg-brand-card hover:bg-slate-800 border border-brand-border hover:border-red-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 group"
                aria-label={`Call ${line.name} at number ${line.number}`}
              >
                <div className="p-2 bg-slate-900 text-red-400 group-hover:text-red-300 rounded-lg flex-shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-brand-text group-hover:text-white transition-colors">
                    {line.name}
                  </span>
                  <span className="block text-sm font-black text-red-400">
                    {line.number}
                  </span>
                  <span className="block text-[10px] text-brand-muted leading-snug">
                    {line.description}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Informational and Privacy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-brand-border pt-6 text-xs leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-semibold text-brand-text flex items-center space-x-1.5">
              <Eye className="h-4.5 w-4.5 text-indigo-400" />
              <span>Privacy & Security</span>
            </h5>
            <p>
              Your safety is our priority. Resilienta does not store your voice files or transcriptions. Speech processing runs locally on your browser via the Web Speech API. GenAI requests use secure pipelines with zero retention policies.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-semibold text-brand-text flex items-center space-x-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-400" />
              <span>Clinical Disclaimer</span>
            </h5>
            <p>
              Resilienta is a GenAI-assisted support platform designed to help navigate moments of high cognitive load and cravings. It is NOT a medical device, therapeutic resource, or replacement for professional clinical care. In any critical health crisis, please call 911 immediately.
            </p>
          </div>
        </div>

        {/* Copyright branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-brand-border/60 text-[10px] text-slate-500">
          <span className="flex items-center space-x-1">
            <span>Powered by Gemini 1.5 Flash</span>
            <Heart className="h-3 w-3 text-indigo-500" />
          </span>
          <span>© {new Date().getFullYear()} Resilienta. Designed for recovery and prevention.</span>
        </div>

      </div>
    </footer>
  );
}
