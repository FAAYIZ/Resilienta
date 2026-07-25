import React, { useState, useEffect, useRef } from 'react';
import { Eye, Hand, Volume2, Wind, Sparkles, ChevronLeft, ChevronRight, Play, Square, RotateCcw, Check } from 'lucide-react';
import { GROUNDING_STEPS } from '../utils/constants';

/**
 * @component GroundingTool
 * @description Coordinates physical anxiety relief tools:
 * 1. 4-7-8 Breathing circle with interactive scaling animations and timing prompts.
 * 2. 5-4-3-2-1 Sensory Grounding Wizard offering step-by-step checklists to redirect cognitive strain.
 * 
 * @returns {React.JSX.Element} The rendered GroundingTool component
 */
export default function GroundingTool() {
  const [activeSubTab, setActiveSubTab] = useState('breathing'); // 'breathing' or 'sensory'
  
  // --- 4-7-8 Breathing States ---
  const [breathPhase, setBreathPhase] = useState('idle'); // 'idle', 'inhale', 'hold', 'exhale'
  const [breathCount, setBreathCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);

  // --- 5-4-3-2-1 Sensory Wizard States ---
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState({
    5: [false, false, false, false, false],
    4: [false, false, false, false],
    3: [false, false, false],
    2: [false, false],
    1: [false]
  });
  const [textAnswers, setTextAnswers] = useState({
    5: ['', '', '', '', ''],
    4: ['', '', '', ''],
    3: ['', '', ''],
    2: ['', ''],
    1: ['']
  });

  // --- 4-7-8 Timer Logic ---
  useEffect(() => {
    if (breathPhase === 'idle') {
      if (timerRef.current) clearInterval(timerRef.current);
      setBreathCount(0);
      return;
    }

    timerRef.current = setInterval(() => {
      setBreathCount((prev) => {
        if (breathPhase === 'inhale') {
          if (prev >= 4) {
            setBreathPhase('hold');
            return 1;
          }
          return prev + 1;
        } else if (breathPhase === 'hold') {
          if (prev >= 7) {
            setBreathPhase('exhale');
            return 1;
          }
          return prev + 1;
        } else if (breathPhase === 'exhale') {
          if (prev >= 8) {
            setBreathPhase('inhale');
            setCycleCount((c) => c + 1);
            return 1;
          }
          return prev + 1;
        }
        return 0;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [breathPhase]);

  const startBreathing = () => {
    setBreathPhase('inhale');
    setBreathCount(1);
    setCycleCount(1);
  };

  const stopBreathing = () => {
    setBreathPhase('idle');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getBreathCircleColor = () => {
    switch (breathPhase) {
      case 'inhale': return 'bg-emerald-500/20 border-emerald-500 scale-125';
      case 'hold': return 'bg-amber-500/20 border-amber-500 scale-125';
      case 'exhale': return 'bg-blue-500/20 border-blue-500 scale-95';
      default: return 'bg-slate-800/80 border-slate-700 scale-100';
    }
  };

  const getBreathCircleText = () => {
    switch (breathPhase) {
      case 'inhale': return 'Inhale';
      case 'hold': return 'Hold';
      case 'exhale': return 'Exhale';
      default: return 'Ready';
    }
  };

  // --- 5-4-3-2-1 Grounding Logic ---
  const currentStepData = GROUNDING_STEPS[currentStepIdx];
  
  const handleCheckboxToggle = (stepNumber, index) => {
    setCheckedItems((prev) => {
      const updated = { ...prev };
      updated[stepNumber] = [...updated[stepNumber]];
      updated[stepNumber][index] = !updated[stepNumber][index];
      return updated;
    });
  };

  const handleTextAnswerChange = (stepNumber, index, value) => {
    setTextAnswers((prev) => {
      const updated = { ...prev };
      updated[stepNumber] = [...updated[stepNumber]];
      updated[stepNumber][index] = value;
      return updated;
    });
  };

  const resetSensoryWizard = () => {
    setCurrentStepIdx(0);
    setCheckedItems({
      5: [false, false, false, false, false],
      4: [false, false, false, false],
      3: [false, false, false],
      2: [false, false],
      1: [false]
    });
    setTextAnswers({
      5: ['', '', '', '', ''],
      4: ['', '', '', ''],
      3: ['', '', ''],
      2: ['', ''],
      1: ['']
    });
  };

  const getStepIcon = (iconName) => {
    const props = { className: "h-6 w-6 text-indigo-400" };
    switch (iconName) {
      case 'Eye': return <Eye {...props} />;
      case 'Touchpad': return <Hand {...props} />;
      case 'Volume2': return <Volume2 {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section 
      id="grounding-panel"
      role="tabpanel"
      aria-label="Sensory Grounding and Breathing Tools"
      className="w-full bg-brand-card rounded-2xl border border-brand-border shadow-2xl p-6 md:p-8 animate-slide-up"
    >
      {/* Sub tabs selector */}
      <div className="flex border-b border-brand-border mb-6">
        <button
          onClick={() => setActiveSubTab('breathing')}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all focus:outline-none ${
            activeSubTab === 'breathing'
              ? 'border-indigo-500 text-indigo-400 font-bold'
              : 'border-transparent text-brand-muted hover:text-brand-text'
          }`}
          aria-selected={activeSubTab === 'breathing'}
          role="tab"
        >
          4-7-8 Breathing Guide
        </button>
        <button
          onClick={() => setActiveSubTab('sensory')}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all focus:outline-none ${
            activeSubTab === 'sensory'
              ? 'border-indigo-500 text-indigo-400 font-bold'
              : 'border-transparent text-brand-muted hover:text-brand-text'
          }`}
          aria-selected={activeSubTab === 'sensory'}
          role="tab"
        >
          5-4-3-2-1 Sensory Grounding
        </button>
      </div>

      {/* SUB-TAB: BREATHING GUIDE */}
      {activeSubTab === 'breathing' && (
        <div className="flex flex-col items-center py-6 space-y-8 animate-fade-in">
          <div className="text-center max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-brand-text">4-7-8 Calming Breath</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Inhale through your nose for 4s, hold your breath for 7s, and exhale completely through your mouth for 8s. Repeat this cycle up to 4 times.
            </p>
          </div>

          {/* Interactive Breathing Sphere */}
          <div className="relative flex items-center justify-center h-64 w-full">
            {/* Dynamic Backdrop Glow */}
            <div className={`absolute rounded-full filter blur-xl opacity-30 transition-all duration-1000 w-48 h-48 ${
              breathPhase === 'inhale' ? 'bg-emerald-500 scale-150' :
              breathPhase === 'hold' ? 'bg-amber-500 scale-150' :
              breathPhase === 'exhale' ? 'bg-blue-500 scale-90' :
              'bg-slate-700 scale-100'
            }`} />

            {/* Breathing Circle */}
            <div 
              className={`w-44 h-44 rounded-full border-8 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-out shadow-2xl z-10 ${getBreathCircleColor()}`}
              style={{
                // Override transition duration dynamically depending on phase
                transitionDuration: 
                  breathPhase === 'inhale' ? '4000ms' : 
                  breathPhase === 'hold' ? '7000ms' : 
                  breathPhase === 'exhale' ? '8000ms' : '1000ms'
              }}
            >
              <span className="text-2xl font-black text-white uppercase tracking-wider">
                {getBreathCircleText()}
              </span>
              {breathPhase !== 'idle' && (
                <span className="text-sm font-semibold text-slate-200 mt-1 animate-pulse">
                  {breathCount}s
                </span>
              )}
            </div>
          </div>

          {/* Breathing Controls */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              {breathPhase === 'idle' ? (
                <button
                  onClick={startBreathing}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Start breathing guide exercise"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Exercise</span>
                </button>
              ) : (
                <button
                  onClick={stopBreathing}
                  className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-rose-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 animate-pulse"
                  aria-label="Stop breathing exercise"
                >
                  <Square className="h-4 w-4" />
                  <span>Stop / Reset</span>
                </button>
              )}
            </div>
            
            {breathPhase !== 'idle' && (
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Cycle Progress: {cycleCount} / 4
              </span>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB: 5-4-3-2-1 SENSORY WIZARD */}
      {activeSubTab === 'sensory' && currentStepData && (
        <div className="space-y-6 animate-fade-in">
          {/* Progress bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-brand-border">
            <div 
              className="bg-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentStepIdx + 1) / GROUNDING_STEPS.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStepIdx + 1}
              aria-valuemin={1}
              aria-valuemax={GROUNDING_STEPS.length}
              aria-label={`Grounding step ${currentStepIdx + 1} of ${GROUNDING_STEPS.length}`}
            />
          </div>

          {/* Step layout */}
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${currentStepData.color} border border-brand-border flex items-start space-x-4`}>
            <div className="p-3 bg-brand-darker rounded-xl border border-brand-border flex-shrink-0">
              {getStepIcon(currentStepData.icon)}
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
                Step {currentStepIdx + 1} of 5
              </span>
              <h3 className="text-lg font-bold text-brand-text leading-snug">
                {currentStepData.title}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Interactive Checklist Form */}
          <div className="space-y-3">
            {checkedItems[currentStepData.step].map((checked, index) => (
              <div 
                key={`check-${currentStepData.step}-${index}`} 
                className="flex items-center space-x-3 bg-slate-900/60 p-3 rounded-xl border border-brand-border/60 hover:border-brand-border transition focus-within:ring-2 focus-within:ring-indigo-500/40"
              >
                <button
                  type="button"
                  onClick={() => handleCheckboxToggle(currentStepData.step, index)}
                  className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                    checked 
                      ? 'bg-emerald-600 border-emerald-500 text-white' 
                      : 'bg-brand-darker border-slate-700 hover:border-slate-500 text-transparent'
                  }`}
                  aria-label={`Mark item ${index + 1} as completed`}
                  aria-pressed={checked}
                >
                  <Check className="h-4 w-4" />
                </button>

                <input
                  type="text"
                  placeholder={`Identify item #${index + 1}...`}
                  value={textAnswers[currentStepData.step][index]}
                  onChange={(e) => handleTextAnswerChange(currentStepData.step, index, e.target.value)}
                  className={`bg-transparent border-b w-full py-1 text-sm text-brand-text focus:outline-none focus:border-indigo-500 transition-colors ${
                    checked ? 'line-through text-brand-muted' : 'border-slate-800'
                  }`}
                  aria-label={`Describe item ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Wizard Navigation Toolbar */}
          <div className="flex items-center justify-between pt-4 border-t border-brand-border">
            <button
              onClick={resetSensoryWizard}
              className="text-xs text-brand-muted hover:text-brand-text flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-brand-border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Reset sensory grounding questionnaire"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentStepIdx((idx) => Math.max(0, idx - 1))}
                disabled={currentStepIdx === 0}
                className={`p-2 rounded-xl border border-brand-border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  currentStepIdx === 0 
                    ? 'opacity-30 cursor-not-allowed bg-transparent text-slate-600' 
                    : 'bg-slate-800 text-brand-muted hover:text-brand-text'
                }`}
                aria-label="Previous grounding step"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={() => setCurrentStepIdx((idx) => Math.min(GROUNDING_STEPS.length - 1, idx + 1))}
                disabled={currentStepIdx === GROUNDING_STEPS.length - 1}
                className={`p-2 rounded-xl border border-brand-border flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  currentStepIdx === GROUNDING_STEPS.length - 1 
                    ? 'opacity-30 cursor-not-allowed bg-transparent text-slate-600' 
                    : 'bg-slate-800 text-brand-muted hover:text-brand-text'
                }`}
                aria-label="Next grounding step"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
