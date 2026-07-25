import React, { useState, lazy, Suspense, useCallback } from 'react';
import Navbar from './components/Navbar';
import QuickActions from './components/QuickActions';
import VoiceInput from './components/VoiceInput';
import Footer from './components/Footer';
import { generateEmergencyScript } from './services/geminiService';
import { Sparkles, MessageSquare, AlertCircle, Heart } from 'lucide-react';

// Lazy loading sub-components for optimized chunk loading
const EmergencyScripts = lazy(() => import('./components/EmergencyScripts'));
const GroundingTool = lazy(() => import('./components/GroundingTool'));
const ResourceHub = lazy(() => import('./components/ResourceHub'));

/**
 * Loading fallback component for lazy-loaded sections.
 * 
 * @returns {React.JSX.Element} High-contrast animated spinner
 */
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-12 space-y-4" role="status" aria-label="Loading section">
    <span className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-xs font-semibold text-indigo-400 tracking-wide animate-pulse">
      Loading workspace...
    </p>
  </div>
);

/**
 * @component App
 * @description Main application controller and state manager for Resilienta.
 * Coordinates roles (Individual/Caregiver), active panels, Gemini script calls, and main layout structure.
 * 
 * @returns {React.JSX.Element} The rendered React Application structure
 */
export default function App() {
  const [role, setRole] = useState('individual'); // 'individual' or 'caregiver'
  const [activeTab, setActiveTab] = useState('sos'); // 'sos', 'grounding', 'hub'
  
  // Script generation states
  const [script, setScript] = useState('');
  const [scriptType, setScriptType] = useState('sos'); // 'sos', 'de_escalation', 'refusal'
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastVoiceContext, setLastVoiceContext] = useState('');

  /**
   * Helper to execute Gemini generation service and update script state.
   * Wrapped in useCallback to prevent child components from unnecessary re-renders.
   */
  const runScriptGeneration = useCallback(async (type, context) => {
    setIsGenerating(true);
    setScript(''); // Clear previous script
    try {
      const result = await generateEmergencyScript(type, context);
      setScript(result);
    } catch (err) {
      console.error("Failed to generate script:", err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Triggers when user selects a 1-tap quick action chip.
   * Wrapped in useCallback to prevent child components from unnecessary re-renders.
   */
  const handleActionSelect = useCallback(async (actionId) => {
    if (actionId === 'grounding') {
      setActiveTab('grounding');
      return;
    }

    setActiveTab('sos');
    setScriptType(actionId);
    setLastVoiceContext('');
    
    // Trigger immediate initial script generation using standard prompts
    await runScriptGeneration(actionId, '');
  }, [runScriptGeneration]);

  /**
   * Callback triggered when voice recording transcript or keyboard fallback is submitted.
   * Wrapped in useCallback to prevent child components from unnecessary re-renders.
   */
  const handleInputSubmit = useCallback(async (transcript) => {
    setLastVoiceContext(transcript);
    await runScriptGeneration(scriptType, transcript);
  }, [scriptType, runScriptGeneration]);

  /**
   * Dynamic placeholder getter for voice input depending on action type.
   */
  const getVoiceInputPlaceholder = () => {
    switch (scriptType) {
      case 'de_escalation':
        return "Say: 'My loved one is yelling and refusing to put down a package' or similar context...";
      case 'refusal':
        return "Say: 'I am going to a birthday party where there will be peer pressure to drink alcohol'...";
      default:
        return "Say: 'I am sitting alone, my chest is tight, and I really want to call someone'...";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-darker">
      <Navbar 
        currentRole={role} 
        setRole={setRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Compact Page Title Row */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-5 gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="bg-gradient-to-tr from-indigo-500 to-rose-500 p-2 rounded-xl shadow-md">
              <Heart className="h-5 w-5 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-black text-brand-text tracking-tight leading-none">
              {role === 'individual' 
                ? 'Resilienta Recovery Companion' 
                : 'Caregiver Support Hub'
              }
            </h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
              role === 'individual'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}>
              {role === 'individual' ? 'Active: SUD Individual' : 'Active: Caregiver'}
            </span>
          </div>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 border border-brand-border text-brand-muted">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Support Engine Active</span>
          </span>
        </header>

        {/* 1-Tap Emergency Quick Actions */}
        <section aria-label="Quick Action Controls">
          <QuickActions onActionSelect={handleActionSelect} currentRole={role} />
        </section>

        {/* Tab panels and interactive tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main workspace (takes 2 cols on wide screens) */}
          <div className="lg:col-span-2 space-y-6">
            <Suspense fallback={<LoadingSpinner />}>
              {activeTab === 'sos' && (
                <div className="space-y-6">
                  
                  {/* Script Display */}
                  {(script || isGenerating) && (
                    <EmergencyScripts 
                      script={script} 
                      type={scriptType} 
                      isGenerating={isGenerating}
                      onRegenerate={() => runScriptGeneration(scriptType, lastVoiceContext)}
                    />
                  )}

                  {/* Voice/Keyboard Refinement box */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4.5 w-4.5 text-indigo-400" />
                      <h3 className="text-sm font-bold text-brand-text">
                        {script ? 'Refine Script with Extra Context' : 'Select a Quick Action above, or describe your state below'}
                      </h3>
                    </div>
                    <VoiceInput 
                      onSubmit={handleInputSubmit} 
                      placeholder={getVoiceInputPlaceholder()}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'grounding' && (
                <GroundingTool />
              )}

              {activeTab === 'hub' && (
                <ResourceHub />
              )}
            </Suspense>
          </div>

          {/* Quick-Help sidebar (takes 1 col) */}
          <aside className="space-y-6 flex flex-col h-fit">
            
            {/* Quick Grounding breathing promo */}
            <div className="p-6 bg-gradient-to-br from-indigo-950/20 to-brand-card rounded-2xl border border-brand-border space-y-4 shadow-lg">
              <h4 className="font-bold text-sm text-brand-text flex items-center space-x-2">
                <span>Immediate Grounding Tips</span>
              </h4>
              <ul className="text-xs text-brand-muted space-y-2.5 list-disc pl-4 leading-relaxed">
                <li>
                  <strong className="text-indigo-300">Drop your shoulders:</strong> Release the physical tension in your neck.
                </li>
                <li>
                  <strong className="text-indigo-300">Cold water shock:</strong> Wash your face with cold water to trigger the mammalian dive reflex and drop heart rate.
                </li>
                <li>
                  <strong className="text-indigo-300">The 4-7-8 rhythm:</strong> Head over to the <button onClick={() => setActiveTab('grounding')} className="text-indigo-400 font-bold hover:underline">Grounding Tab</button> to breathe alongside our pacing guides.
                </li>
              </ul>
            </div>

            {/* Quick Hotline disclaimer warning */}
            <div className="p-6 bg-red-950/10 border border-red-500/20 rounded-2xl space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <h4 className="font-bold text-xs uppercase tracking-wider">Urgent Assistance</h4>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                If you are in immediate danger of using substances, harming yourself, or if you feel completely unsafe, please utilize the 24/7 hotline links in the footer below. You do not have to struggle alone.
              </p>
              <a
                href="tel:988"
                className="inline-flex items-center justify-center w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 px-4 rounded-xl transition duration-150 shadow-md shadow-red-600/10"
              >
                Dial 988 Lifeline Now
              </a>
            </div>

          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
