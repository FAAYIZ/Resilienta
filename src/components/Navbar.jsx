import React, { useState } from 'react';
import { Heart, Activity, ShieldAlert, Users, Menu, X, PhoneCall } from 'lucide-react';

/**
 * @component Navbar
 * @description Renders the application global header. Features high-contrast tab controls,
 * a state-linked user role toggle switch, and a direct dial shortcut for the 988 emergency hotline.
 * 
 * @param {Object} props
 * @param {string} props.currentRole - Active user perspective ('individual' or 'caregiver')
 * @param {Function} props.setRole - Setter handler to adjust active perspective
 * @param {string} props.activeTab - Currently loaded page/panel identifier
 * @param {Function} props.setActiveTab - Navigation handler to switch panels
 * @returns {React.JSX.Element} The rendered Navbar component
 */
export default function Navbar({ currentRole, setRole, activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleRole = () => {
    setRole(currentRole === 'individual' ? 'caregiver' : 'individual');
  };

  const navItems = [
    { id: 'sos', label: 'Emergency Scripts', icon: ShieldAlert },
    { id: 'grounding', label: 'Grounding & Calm', icon: Activity },
    { id: 'hub', label: 'Coping Resource Hub', icon: Users },
  ];

  return (
    <nav className="bg-brand-darker border-b border-brand-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-rose-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Heart className="h-6 w-6 text-white animate-pulse" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-text bg-gradient-to-r from-indigo-200 via-slate-100 to-rose-200 bg-clip-text text-transparent">
                Resilienta
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-indigo-400 border border-indigo-500/20">
                SUD Support
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-1" role="tablist" aria-label="Main Navigation">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${item.id}-panel`}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isActive
                        ? 'bg-brand-card text-indigo-400 border border-brand-border shadow-md'
                        : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/50'
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Role Toggle Switch */}
            <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-full border border-brand-border">
              <span className={`text-xs font-semibold ${currentRole === 'individual' ? 'text-emerald-400' : 'text-brand-muted'}`}>
                SUD Mode
              </span>
              <button
                onClick={toggleRole}
                role="switch"
                aria-checked={currentRole === 'caregiver'}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  currentRole === 'caregiver' ? 'bg-indigo-600' : 'bg-slate-600'
                }`}
                aria-label="Switch between Navigating SUD individual mode and Caregiver mode"
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    currentRole === 'caregiver' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-semibold ${currentRole === 'caregiver' ? 'text-indigo-400' : 'text-brand-muted'}`}>
                Caregiver Mode
              </span>
            </div>

            {/* Emergency Hotline Button */}
            <a
              href="tel:988"
              className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-red-500/20 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Call 988 Suicide and Crisis Lifeline immediately"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Call 988 SOS</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href="tel:988"
              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-md transition-all"
              aria-label="Call 988 Lifeline"
            >
              <PhoneCall className="h-5 w-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-darker border-t border-brand-border px-4 py-4 space-y-4 animate-fade-in">
          {/* Navigation Items */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-indigo-400 border border-brand-border'
                      : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/40'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Role Toggle Switch for Mobile */}
          <div className="border-t border-brand-border pt-4">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-xl border border-brand-border">
              <span className="text-sm font-semibold text-brand-text">Active Environment:</span>
              <button
                onClick={toggleRole}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors ${
                  currentRole === 'individual'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                }`}
                aria-label="Switch User Mode"
              >
                {currentRole === 'individual' ? (
                  <span>Individual (SUD Mode)</span>
                ) : (
                  <span>Caregiver Mode</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
