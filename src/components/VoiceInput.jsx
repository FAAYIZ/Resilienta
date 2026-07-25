import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Keyboard, MessageSquare, AlertCircle } from 'lucide-react';

export default function VoiceInput({ onSubmit, placeholder, isGenerating }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [useKeyboard, setUseKeyboard] = useState(false);
  const [speechError, setSpeechError] = useState('');
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setUseKeyboard(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError('');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setSpeechError('Microphone permission denied. Please enable it in browser settings or use keyboard input.');
      } else if (event.error === 'no-speech') {
        setSpeechError('No speech detected. Please try speaking closer to your microphone.');
      } else {
        setSpeechError(`Speech error: ${event.error}. Please try typing.`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setTranscript((prev) => {
        // Concatenate if it's new final content
        if (finalTranscript) {
          return finalTranscript;
        }
        return interimTranscript || prev;
      });
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      setSpeechError('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setSpeechError('Could not access microphone. Try typing instead.');
      }
    }
  };

  const handleTextChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (transcript.trim()) {
      onSubmit(transcript);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-card/90 backdrop-blur-md rounded-2xl p-6 border border-brand-border shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-indigo-400 flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Describe how you feel or what happened</span>
        </h3>
        
        {isSupported && (
          <button
            onClick={() => setUseKeyboard(!useKeyboard)}
            type="button"
            className="text-xs text-brand-muted hover:text-brand-text flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-800 border border-brand-border transition"
            aria-label={useKeyboard ? "Switch to Voice Input" : "Switch to Keyboard Input"}
          >
            {useKeyboard ? (
              <>
                <Mic className="h-3 w-3" />
                <span>Use Voice</span>
              </>
            ) : (
              <>
                <Keyboard className="h-3 w-3" />
                <span>Use Keyboard</span>
              </>
            )}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Interactive Speech UI */}
        {!useKeyboard && isSupported ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="relative">
              {isListening && (
                <span className="absolute -inset-2 rounded-full bg-indigo-500/20 animate-ping" />
              )}
              <button
                type="button"
                onClick={toggleListening}
                disabled={isGenerating}
                className={`relative flex items-center justify-center w-24 h-24 rounded-full border-4 shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 ${
                  isListening
                    ? 'bg-rose-500/10 border-rose-500 text-rose-400 hover:bg-rose-500/20'
                    : 'bg-indigo-600/15 border-indigo-500 text-indigo-400 hover:bg-indigo-600/30'
                }`}
                aria-label={isListening ? "Stop listening to voice input" : "Start listening to voice input"}
                aria-pressed={isListening}
              >
                {isListening ? (
                  <MicOff className="h-10 w-10 animate-pulse" />
                ) : (
                  <Mic className="h-10 w-10" />
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-brand-text">
                {isListening ? 'Listening carefully... Click again to stop.' : 'Click to Speak'}
              </p>
              <p className="text-xs text-brand-muted mt-1">
                {isListening ? 'Speak clearly into your microphone' : 'Voice-first design for high cognitive load'}
              </p>
            </div>

            {/* Live Transcript Display Box */}
            <div className="w-full">
              <label htmlFor="voice-transcript" className="sr-only">Voice Transcript</label>
              <textarea
                id="voice-transcript"
                rows={3}
                className="w-full bg-brand-darker border border-brand-border rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm transition-all focus:outline-none"
                placeholder={placeholder || "Say: 'I am feeling overwhelmed' or 'I need help refusing a drink'..."}
                value={transcript}
                onChange={handleTextChange}
                aria-label="Voice input transcript box. You can edit this text."
              />
            </div>
          </div>
        ) : (
          /* Keyboard Input Box */
          <div className="space-y-2 animate-fade-in">
            <label htmlFor="keyboard-input" className="sr-only">Type your message</label>
            <textarea
              id="keyboard-input"
              rows={4}
              className="w-full bg-brand-darker border border-brand-border rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-sm transition-all focus:outline-none"
              placeholder={placeholder || "Describe your situation in details here..."}
              value={transcript}
              onChange={handleTextChange}
              aria-label="Text description box"
            />
          </div>
        )}

        {/* Speech Error Banner */}
        {speechError && (
          <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 animate-slide-up" role="alert">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{speechError}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!transcript.trim() || isGenerating}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all ${
              transcript.trim() && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5'
                : 'bg-slate-800 text-brand-muted border border-brand-border cursor-not-allowed'
            }`}
            aria-label="Generate support content"
          >
            {isGenerating ? (
              <>
                <span className="h-4 w-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                <span>Generating Script...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Generate Solution</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
