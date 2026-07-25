/**
 * Resilienta - Constants and Configs
 */

export const HELPLINES = [
  {
    name: "988 Suicide & Crisis Lifeline",
    number: "988",
    description: "Free, confidential support available 24/7. Call or text.",
    href: "tel:988"
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Treatment referral and info service (English/Spanish), 24/7.",
    href: "tel:1-800-662-4357"
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    description: "Text HOME to 741741 to connect with a crisis counselor 24/7.",
    href: "sms:741741?&body=HOME"
  }
];

export const GROUNDING_STEPS = [
  {
    step: 5,
    title: "5 Things You Can See",
    description: "Look around you. Name 5 things you can see in your immediate environment (e.g., a clock, a chair, a plant, a shadow, a cup). Take your time.",
    color: "from-blue-500/20 to-blue-600/10",
    icon: "Eye",
    ariaLabel: "Grounding step 5: identify 5 things you see."
  },
  {
    step: 4,
    title: "4 Things You Can Feel",
    description: "Pay attention to your body. Name 4 things you can physically feel (e.g., the texture of your shirt, the hard floor under your feet, the breeze on your face, the back of your chair).",
    color: "from-indigo-500/20 to-indigo-600/10",
    icon: "Touchpad",
    ariaLabel: "Grounding step 4: identify 4 things you feel."
  },
  {
    step: 3,
    title: "3 Things You Can Hear",
    description: "Listen closely. Name 3 things you can hear in the background (e.g., traffic hum, bird chirps, ticking clock, refrigerator running, typing sound).",
    color: "from-violet-500/20 to-violet-600/10",
    icon: "Volume2",
    ariaLabel: "Grounding step 3: identify 3 things you hear."
  },
  {
    step: 2,
    title: "2 Things You Can Smell",
    description: "Breathe in. Name 2 things you can smell right now (e.g., coffee brewing, soap, cut grass, perfume, the pages of a book, or even just fresh air).",
    color: "from-purple-500/20 to-purple-600/10",
    icon: "Wind",
    ariaLabel: "Grounding step 2: identify 2 things you smell."
  },
  {
    step: 1,
    title: "1 Thing You Can Taste",
    description: "Focus on your mouth. Name 1 thing you can taste (e.g., the mint toothpaste from this morning, a sip of water, or simply the neutral state of your tongue).",
    color: "from-rose-500/20 to-rose-600/10",
    icon: "Sparkles",
    ariaLabel: "Grounding step 1: identify 1 thing you taste."
  }
];

export const PRESET_COPING_QUESTIONS = [
  {
    id: "boundaries",
    label: "How do I set boundaries with my loved one?",
    question: "How do I set healthy, loving boundaries as a caregiver supporting someone navigating Substance Use Disorder (SUD), without enabling them or burning myself out?"
  },
  {
    id: "triggers",
    label: "How do I identify triggers early?",
    question: "What are the common early warning signs (behavioral, physical, emotional) of a relapse trigger, and how can a caregiver spot them?"
  },
  {
    id: "relapse",
    label: "What should I do if a relapse happens?",
    question: "What are the immediate, constructive steps a caregiver should take during and immediately following a relapse, ensuring safety and avoiding blame?"
  },
  {
    id: "burnout",
    label: "Tips to avoid caregiver burnout?",
    question: "What are practical daily self-care strategies for caregivers to protect their own mental health and prevent caregiver burnout?"
  }
];

// Fallback scripts using shortened, incident-focused phrasing with colon separators
export const FALLBACK_SCRIPTS = {
  sos: `1. **Change Location**: Move to a different room or step outside immediately to alter your brain state.
2. **⏱️ 15-Minute Wave**: Cravings peak and pass in 15 minutes. Stand firm.
3. **Cold Water**: Drink a large glass of ice-cold water to shock your senses and interrupt obsessive thoughts.
4. **Reach Out**: Call or text your support contact. Let them know you need a 5-minute distraction.
5. **Start Grounding**: Use the 5-4-3-2-1 tool or the breathing guide below to calm your nervous system.`,

  de_escalation: `1. **Lower Pitch**: Speak slowly, softly, and keep your voice calm.
2. **Validate Emotion**: Say: "I see you are overwhelmed, and I care about your safety."
3. **Safe Space**: Give physical space and maintain a non-threatening posture.
4. **Take Pause**: Suggest sitting down and having a glass of water together.`,

  refusal: `1. **Direct No**: "No, thanks. I am not drinking/using tonight."
2. **Break/Health**: "I am taking a break for my health. I feel much better."
3. **Humor Option**: "I have already retired from that! I will stick to this soda."
4. **Distract/Pivot**: "I am good, thank you. By the way, did you see the game?"`
};

export const GEMINI_PROMPTS = {
  sos: `You are an empathetic, clinical-grade AI crisis recovery coach supporting someone during an active substance craving (Substance Use Disorder - SUD).
The user is experiencing high cognitive load and distress.
Generate a step-by-step, highly calming, compassionate, and actionable coping script.
Format each step as a numbered item with a bold header, followed by a colon and a single sentence explanation.
Example:
1. **Change Location**: Move to a different room or step outside immediately.
Do NOT use paragraph text. Keep it simple and clear. Let's begin. User voice/input text: `,

  de_escalation: `You are a professional crisis de-escalation expert specializing in family support and caregiver intervention for Substance Use Disorder (SUD).
The user is a caregiver facing a high-tension, high-stress relapse threat or conflict with their loved one.
Generate a de-escalation script that the caregiver can read directly.
Format each step as a numbered item with a bold header, followed by a colon and a single sentence explanation.
Example:
1. **Lower Pitch**: Speak slowly, softly, and keep your voice calm.
Keep it easy to read. User voice/input text: `,

  refusal: `You are a supportive, practical recovery mentor helping an individual in recovery prepare for social pressure.
Generate 4 distinct, confident, polite, and firm refusal scripts to turn down offers of alcohol or drugs.
Format each script as a numbered item with a bold header, followed by a colon and a single sentence explanation.
Example:
1. **Direct No**: "No, thanks. I am not drinking/using tonight."
Keep it extremely practical. User voice/input text: `,

  coping_hub: `You are a clinical AI advisor specialized in Substance Use Disorder (SUD) education, boundary setting, and caregiver self-care.
The caregiver has asked: [QUESTION].
Provide a highly structured, empathetic, and comprehensive response.
Include:
1. **Understanding Context**: Validate the caregiver's distress and explain the behavior.
2. **Action Steps**: 3-4 bulleted steps they can take today.
3. **Communication Phrases**: What they can say.
4. **Self-Care Reminder**: A note on protecting their own health.
Use clean formatting, headers, and bullet points. Avoid jargon. Provide practical, real-world advice.`
};
