import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Copy, Check, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export default function EmergencyScripts({ script, type, onRegenerate, isGenerating }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Stop speaking when script changes
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [script]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Remove Markdown symbols for cleaner speech rendering
      const cleanText = script
        .replace(/#+\s+/g, '') // Headings
        .replace(/\*\*/g, '')  // Bold
        .replace(/>\s*\[!(NOTE|IMPORTANT|WARNING)\]/gi, '') // Alert banners
        .replace(/>/g, '')     // Quotes
        .replace(/\*\s+/g, '') // Bullets
        .replace(/-\s+/g, '')  // Dash bullets
        .replace(/\d+\.\s+/g, ''); // Numbers

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        console.error('SpeechSynthesis error:', e);
        setIsPlaying(false);
      };

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Safe manual markdown parser for rendering formatted text without external HTML injection issues
  const renderFormattedScript = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    let insideList = false;
    const elements = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for alert banners
      if (trimmed.startsWith('> [!NOTE]') || trimmed.startsWith('> [!IMPORTANT]')) {
        elements.push(
          <div key={`alert-${index}`} className="p-3 my-3 bg-indigo-500/10 border-l-4 border-indigo-500 rounded text-xs text-indigo-300">
            <strong>System Protocol Enabled:</strong> Curated emergency guidelines are active.
          </div>
        );
        return;
      }
      
      if (trimmed.startsWith('>')) {
        // Strip the > and parse the inner text
        const quoteText = trimmed.replace(/^>\s*/, '');
        elements.push(
          <blockquote key={`quote-${index}`} className="border-l-4 border-slate-600 pl-4 py-1 my-3 text-brand-muted italic text-sm">
            {parseInlineStyles(quoteText)}
          </blockquote>
        );
        return;
      }

      // Check for headers
      if (trimmed.startsWith('###')) {
        elements.push(
          <h4 key={`h3-${index}`} className="text-base font-bold text-indigo-400 mt-4 mb-2">
            {parseInlineStyles(trimmed.replace(/^###\s*/, ''))}
          </h4>
        );
        return;
      }
      if (trimmed.startsWith('##')) {
        elements.push(
          <h3 key={`h2-${index}`} className="text-lg font-extrabold text-brand-text mt-5 mb-3 border-b border-brand-border pb-1">
            {parseInlineStyles(trimmed.replace(/^##\s*/, ''))}
          </h3>
        );
        return;
      }
      if (trimmed.startsWith('#')) {
        elements.push(
          <h2 key={`h1-${index}`} className="text-xl font-black text-brand-text mt-6 mb-4">
            {parseInlineStyles(trimmed.replace(/^#\s*/, ''))}
          </h2>
        );
        return;
      }

      // Check for bullet lists
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const itemText = trimmed.replace(/^[\*\-]\s*/, '');
        elements.push(
          <li key={`li-${index}`} className="list-disc ml-5 my-1 text-sm text-brand-text leading-relaxed">
            {parseInlineStyles(itemText)}
          </li>
        );
        return;
      }

      // Numbered lists
      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numberMatch) {
        elements.push(
          <li key={`num-${index}`} className="list-decimal ml-5 my-1 text-sm text-brand-text leading-relaxed">
            {parseInlineStyles(numberMatch[2])}
          </li>
        );
        return;
      }

      // Plain paragraphs
      if (trimmed !== '') {
        elements.push(
          <p key={`p-${index}`} className="text-sm text-brand-text leading-relaxed my-2">
            {parseInlineStyles(trimmed)}
          </p>
        );
      }
    });

    return <div className="space-y-1">{elements}</div>;
  };

  // Helper to parse bold (**text**) and italics (*text*) within lines
  const parseInlineStyles = (lineText) => {
    const parts = [];
    let currentIdx = 0;
    
    // Bold regex: **word**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(lineText)) !== null) {
      const matchIdx = match.index;
      // Add text before match
      if (matchIdx > currentIdx) {
        parts.push(lineText.substring(currentIdx, matchIdx));
      }
      // Add bold text
      parts.push(<strong key={`bold-${matchIdx}`} className="text-white font-semibold">{match[1]}</strong>);
      currentIdx = boldRegex.lastIndex;
    }

    if (currentIdx < lineText.length) {
      parts.push(lineText.substring(currentIdx));
    }

    return parts.length > 0 ? parts : lineText;
  };

  const getHeaderDetails = () => {
    switch (type) {
      case 'sos':
        return { title: 'Emergency Craving Rescue Script', color: 'border-red-500/30 bg-red-500/5' };
      case 'de_escalation':
        return { title: 'Caregiver De-escalation Protocol', color: 'border-amber-500/30 bg-amber-500/5' };
      case 'refusal':
        return { title: 'Social Refusal Script Suggestions', color: 'border-emerald-500/30 bg-emerald-500/5' };
      default:
        return { title: 'Support Plan', color: 'border-indigo-500/30 bg-indigo-500/5' };
    }
  };

  const header = getHeaderDetails();

  return (
    <section 
      id="sos-panel"
      role="tabpanel"
      aria-label={header.title}
      className={`w-full bg-brand-card rounded-2xl border ${header.color} shadow-2xl overflow-hidden transition-all duration-300 animate-slide-up`}
    >
      {/* Header toolbar */}
      <div className="px-6 py-4 border-b border-brand-border flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <ShieldAlert className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-bold text-brand-text tracking-tight">
            {header.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {/* TTS Toggle Button */}
          <button
            onClick={handleSpeak}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isPlaying 
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                : 'bg-slate-800 text-brand-muted hover:text-brand-text border border-brand-border'
            }`}
            aria-label={isPlaying ? "Stop reading script aloud" : "Read script aloud"}
            title={isPlaying ? "Stop Speech" : "Listen Aloud"}
          >
            {isPlaying ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Stop Listening</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Listen Aloud</span>
              </>
            )}
          </button>

          {/* Copy Script Button */}
          <button
            onClick={handleCopy}
            className="p-2 bg-slate-800 text-brand-muted hover:text-brand-text rounded-xl border border-brand-border transition-all flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Copy script text to clipboard"
            title="Copy Script"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-xs font-semibold">Copy</span>
              </>
            )}
          </button>

          {/* Optional Regenerate Button */}
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="p-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/20 transition-all flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              aria-label="Regenerate Script"
              title="Regenerate Script"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="text-xs font-semibold">Retry</span>
            </button>
          )}
        </div>
      </div>

      {/* Script content area */}
      <div className="p-6 md:p-8 space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar bg-slate-900/40">
        {renderFormattedScript(script)}
      </div>

      {/* Footer advice */}
      <div className="bg-slate-900/80 px-6 py-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
        <span className="flex items-center space-x-1.5 font-medium">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span>Need direct professional aid? Use hotlines at footer.</span>
        </span>
        <span className="font-semibold text-slate-500">Resilienta AI Engine</span>
      </div>
    </section>
  );
}
