import React, { useState } from 'react';
import { HelpCircle, Send, Sparkles, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';
import { PRESET_COPING_QUESTIONS } from '../utils/constants';
import { askCopingQuestion } from '../services/geminiService';

export default function ResourceHub() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePresetSelect = async (questionText) => {
    setQuery(questionText);
    await fetchCopingAdvice(questionText);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await fetchCopingAdvice(query);
    }
  };

  const fetchCopingAdvice = async (questionText) => {
    setIsLoading(true);
    setError('');
    setAnswer('');
    try {
      const response = await askCopingQuestion(questionText);
      setAnswer(response);
    } catch (err) {
      console.error(err);
      setError('Could not fetch advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Safe manual markdown parser for rendering formatted text without external HTML injection issues
  const renderFormattedAnswer = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check for alert banners
      if (trimmed.startsWith('> [!NOTE]') || trimmed.startsWith('> [!IMPORTANT]')) {
        elements.push(
          <div key={`alert-${index}`} className="p-3 my-3 bg-indigo-500/10 border-l-4 border-indigo-500 rounded text-xs text-indigo-300">
            <strong>Guideline:</strong> Standard boundary-setting guidelines are active.
          </div>
        );
        return;
      }
      
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*/, '');
        elements.push(
          <blockquote key={`quote-${index}`} className="border-l-4 border-slate-600 pl-4 py-1 my-3 text-brand-muted italic text-sm">
            {parseInlineStyles(quoteText)}
          </blockquote>
        );
        return;
      }

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

      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const itemText = trimmed.replace(/^[\*\-]\s*/, '');
        elements.push(
          <li key={`li-${index}`} className="list-disc ml-5 my-1 text-sm text-brand-text leading-relaxed">
            {parseInlineStyles(itemText)}
          </li>
        );
        return;
      }

      const numberMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numberMatch) {
        elements.push(
          <li key={`num-${index}`} className="list-decimal ml-5 my-1 text-sm text-brand-text leading-relaxed">
            {parseInlineStyles(numberMatch[2])}
          </li>
        );
        return;
      }

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

  const parseInlineStyles = (lineText) => {
    const parts = [];
    let currentIdx = 0;
    
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(lineText)) !== null) {
      const matchIdx = match.index;
      if (matchIdx > currentIdx) {
        parts.push(lineText.substring(currentIdx, matchIdx));
      }
      parts.push(<strong key={`bold-${matchIdx}`} className="text-white font-semibold">{match[1]}</strong>);
      currentIdx = boldRegex.lastIndex;
    }

    if (currentIdx < lineText.length) {
      parts.push(lineText.substring(currentIdx));
    }

    return parts.length > 0 ? parts : lineText;
  };

  return (
    <section 
      id="hub-panel"
      role="tabpanel"
      aria-label="Caregiver Coping Resource Hub"
      className="w-full bg-brand-card rounded-2xl border border-brand-border shadow-2xl p-6 md:p-8 animate-slide-up"
    >
      <div className="flex items-start space-x-3.5 mb-6">
        <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-brand-text">Caregiver & Coping Resource Hub</h2>
          <p className="text-xs text-brand-muted mt-1 leading-relaxed">
            Find structured, empathetic support guidelines, boundary setting tactics, and crisis mitigation advice.
          </p>
        </div>
      </div>

      {/* Preset Cards Grid */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-3">Preset Help Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_COPING_QUESTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePresetSelect(item.question)}
              disabled={isLoading}
              className="p-4 rounded-xl text-left bg-slate-900/60 hover:bg-slate-900 border border-brand-border hover:border-indigo-500/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Ask topic: ${item.label}`}
            >
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs mb-1.5 group-hover:text-indigo-300">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Q&A Topic</span>
              </div>
              <span className="text-sm font-semibold text-brand-text leading-snug group-hover:text-white">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Q&A Search bar */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full bg-brand-darker border border-brand-border rounded-xl pl-4 pr-12 py-3.5 text-sm text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all focus:outline-none"
            placeholder="Ask a custom question: e.g., 'How do I handle boundaries if they refuse rehab?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            aria-label="Search or ask anything to the coping assistant"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className={`absolute right-2 p-2.5 rounded-lg transition-all ${
              query.trim() && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                : 'text-slate-600 bg-transparent cursor-not-allowed'
            }`}
            aria-label="Send query"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>

      {/* Answer Area */}
      {(answer || isLoading || error) && (
        <div className="mt-6 border-t border-brand-border pt-6 animate-fade-in">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <span className="h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-indigo-400 tracking-wide animate-pulse">
                Consulting Clinical SUD Guidelines...
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-start space-x-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && answer && (
            <div className="p-6 md:p-8 bg-slate-900/40 rounded-xl border border-brand-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <span className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  <Sparkles className="h-4 w-4" />
                  <span>SUD Coping Advisory</span>
                </span>
                <span className="text-[10px] text-slate-500">Gemini Generative Engine</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {renderFormattedAnswer(answer)}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
