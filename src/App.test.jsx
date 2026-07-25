import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';
import '@testing-library/jest-dom';

// Mock the Gemini service to isolate component test execution
vi.mock('./services/geminiService', () => {
  return {
    generateEmergencyScript: vi.fn().mockResolvedValue('Mocked emergency script content'),
    askCopingQuestion: vi.fn().mockResolvedValue('Mocked coping advice content'),
  };
});

describe('Resilienta App - Component Mounting & Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Resilienta navbar and active banner', () => {
    render(<App />);
    
    // Navbar logo
    expect(screen.getByText('Resilienta')).toBeInTheDocument();
    
    // Navigation tabs
    expect(screen.getByText('Emergency Scripts')).toBeInTheDocument();
    expect(screen.getByText('Grounding & Calm')).toBeInTheDocument();
    expect(screen.getByText('Coping Resource Hub')).toBeInTheDocument();
  });

  it('allows navigation between tabs', async () => {
    render(<App />);
    
    // Default tab should show voice input description
    expect(screen.getByText('Select a Quick Action above, or describe your state below')).toBeInTheDocument();
    
    // Click Grounding tab
    const groundingTab = screen.getByText('Grounding & Calm');
    fireEvent.click(groundingTab);
    
    // Grounding tab shows breathing guide
    expect(screen.getByText('4-7-8 Calming Breath')).toBeInTheDocument();
    
    // Click Coping tab
    const copingTab = screen.getByText('Coping Resource Hub');
    fireEvent.click(copingTab);
    
    // Coping tab shows preset topics
    expect(screen.getByText('Preset Help Topics')).toBeInTheDocument();
  });

  it('updates environment role when toggling role switch', () => {
    render(<App />);
    
    // Default environment is SUD Individual
    expect(screen.getByText('Your Recovery & Crisis Prevention Companion')).toBeInTheDocument();
    
    // Toggle role to Caregiver
    const toggleButton = screen.getByRole('switch', { name: /Switch between Navigating SUD/i });
    fireEvent.click(toggleButton);
    
    // Header should change to Caregiver Mode
    expect(screen.getByText('Compassionate Caregiver Support Platform')).toBeInTheDocument();
  });

  it('triggers emergency script generator when selecting a quick action chip', async () => {
    render(<App />);
    
    // Click "Active Craving SOS"
    const cravingChip = screen.getByLabelText(/Activate Active Craving SOS/i);
    fireEvent.click(cravingChip);
    
    // Check if script panel is loading or renders
    await waitFor(() => {
      expect(screen.getByText('Emergency Craving Rescue Script')).toBeInTheDocument();
    });
  });
});
