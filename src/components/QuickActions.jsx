import React from 'react';
import { Flame, Users, Sparkles, Smile } from 'lucide-react';

/**
 * @component QuickActions
 * @description Renders a grid of 4 high-contrast emergency quick action chips.
 * Order is dynamically adjusted to highlight the recommended action depending on the active user role.
 * 
 * @param {Object} props
 * @param {Function} props.onActionSelect - Callback handler when action chip is activated
 * @param {string} props.currentRole - Perspective context ('individual' or 'caregiver')
 * @returns {React.JSX.Element} The rendered QuickActions component
 */
export default function QuickActions({ onActionSelect, currentRole }) {
  const actions = [
    {
      id: 'sos',
      title: 'Active Craving SOS',
      description: 'Immediate calming scripts and physical actions to ride out the craving wave.',
      icon: Flame,
      color: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-500/60 text-red-400',
      badge: 'SUD Recovery Focus',
      ariaLabel: 'Activate Active Craving SOS. Generates a calming recovery script.'
    },
    {
      id: 'de_escalation',
      title: 'Caregiver De-escalation Script',
      description: 'Empathetic steps and verbal scripts to calm down a high-stress confrontation.',
      icon: Users,
      color: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 hover:border-amber-500/60 text-amber-400',
      badge: 'Caregiver Focus',
      ariaLabel: 'Activate Caregiver De-escalation Script. Generates verbal scripts to calm confrontations.'
    },
    {
      id: 'refusal',
      title: 'Refusal Response Generator',
      description: 'Firm, respectful script templates to refuse peer pressure in social settings.',
      icon: Smile,
      color: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400',
      badge: 'Prevention Focus',
      ariaLabel: 'Activate Refusal Response Generator. Generates templates to say no in social settings.'
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding Tool',
      description: 'Calm your mind using our interactive sensory check-list and breathing guide.',
      icon: Sparkles,
      color: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 hover:border-blue-500/60 text-blue-400',
      badge: 'Immediate Relief',
      ariaLabel: 'Activate 5-4-3-2-1 Sensory Grounding Tool. Starts interactive breathing and sensory exercises.'
    }
  ];

  // Re-order or highlight recommendations based on active role
  const sortedActions = [...actions].sort((a, b) => {
    if (currentRole === 'caregiver') {
      if (a.id === 'de_escalation') return -1;
      if (b.id === 'de_escalation') return 1;
    } else {
      if (a.id === 'sos') return -1;
      if (b.id === 'sos') return 1;
    }
    return 0;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-lg font-semibold text-brand-text flex items-center space-x-2">
          <span>1-Tap Emergency Actions</span>
        </h2>
        <p className="text-xs text-brand-muted">
          Zero-effort options designed for moments of high anxiety and cognitive overload.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedActions.map((action) => {
          const IconComponent = action.icon;
          const isRecommended = 
            (currentRole === 'caregiver' && action.id === 'de_escalation') ||
            (currentRole === 'individual' && action.id === 'sos');

          return (
            <button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-indigo-500 ${action.color}`}
              aria-label={action.ariaLabel}
            >
              {isRecommended && (
                <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white shadow shadow-indigo-500/30 animate-pulse">
                  Recommended
                </span>
              )}
              
              <div className="p-3 bg-brand-darker rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="h-6 w-6" />
              </div>

              <div className="space-y-1 mt-auto">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                  {action.badge}
                </span>
                <h3 className="font-bold text-base leading-snug tracking-tight text-brand-text">
                  {action.title}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2 mt-1 font-medium leading-relaxed group-hover:text-brand-text transition-colors">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
