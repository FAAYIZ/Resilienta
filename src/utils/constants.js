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
    ariaLabel: "Grounding step five: identify five things you can see."
  },
  {
    step: 4,
    title: "4 Things You Can Feel",
    description: "Pay attention to your body. Name 4 things you can physically feel (e.g., the texture of your shirt, the hard floor under your feet, the breeze on your face, the back of your chair).",
    color: "from-indigo-500/20 to-indigo-600/10",
    icon: "Touchpad",
    ariaLabel: "Grounding step four: identify four things you can feel."
  },
  {
    step: 3,
    title: "3 Things You Can Hear",
    description: "Listen closely. Name 3 things you can hear in the background (e.g., traffic hum, bird chirps, ticking clock, refrigerator running, typing sound).",
    color: "from-violet-500/20 to-violet-600/10",
    icon: "Volume2",
    ariaLabel: "Grounding step three: identify three things you can hear."
  },
  {
    step: 2,
    title: "2 Things You Can Smell",
    description: "Breathe in. Name 2 things you can smell right now (e.g., coffee brewing, soap, cut grass, perfume, the pages of a book, or even just fresh air).",
    color: "from-purple-500/20 to-purple-600/10",
    icon: "Wind",
    ariaLabel: "Grounding step two: identify two things you can smell."
  },
  {
    step: 1,
    title: "1 Thing You Can Taste",
    description: "Focus on your mouth. Name 1 thing you can taste (e.g., the mint toothpaste from this morning, a sip of water, or simply the neutral state of your tongue).",
    color: "from-rose-500/20 to-rose-600/10",
    icon: "Sparkles",
    ariaLabel: "Grounding step one: identify one thing you can taste."
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

// Fallback scripts in case the Gemini API key is missing or calls fail.
export const FALLBACK_SCRIPTS = {
  sos: `**[FALLBACK SYSTEM NOTIFICATION]**
We've loaded a pre-verified emergency craving mitigation protocol for you.

### Action Plan: Active Craving SOS

1. **Change Your Location immediately**: If you are in a place where you used to use substances, stand up and walk to another room or go outside. Physical movement alters brain states.
2. **The 15-Minute Rule**: Remind yourself that cravings are physiological spikes that peak and then dissipate, usually lasting 15 to 20 minutes. You do not have to fight the craving forever; you just need to wait out this wave.
3. **Drink Water**: Sip a large glass of ice-cold water. The sensory change in your throat helps interrupt obsessive mental loops.
4. **Reach Out**: Text or call one person on your support team right now. Just tell them: "I'm having a craving and I need to talk for five minutes to distract myself."
5. **Start Grounding**: Use the 5-4-3-2-1 Grounding tool or the 4-7-8 Breathing Guide built into Resilienta below to calm your nervous system.`,

  de_escalation: `**[FALLBACK SYSTEM NOTIFICATION]**
We've loaded a pre-verified caregiver de-escalation protocol.

### Action Plan: High-Tension De-escalation Script

1. **Lower Your Vocal Pitch and Volume**: When a loved one is in high cognitive load or agitation, matching their volume escalates tension. Speak softly, slowly, and clearly.
2. **De-escalation Script to Say Aloud**:
   *"I can see that you're incredibly overwhelmed right now, and I want to support you. Let's take a breath together. I am not here to judge or argue. I am here because I care about your safety."*
3. **Validate Emotion, Not Action**:
   *"It makes complete sense that you are angry/scared/stressed. Recovery is incredibly hard. But we don't need to solve everything in this exact second."*
4. **Keep Physical Boundaries Safe**: Give them physical space. Do not block exits. Maintain a non-threatening, open posture (arms uncrossed).
5. **Suggest a Micro-Pause**:
   *"Let's sit down and drink a glass of water. We can talk about this when things feel a little bit calmer."*`,

  refusal: `**[FALLBACK SYSTEM NOTIFICATION]**
We've loaded a pre-verified social refusal protocol.

### Refusal Responses (Firm, Polite, and Non-Negotiable)

*Use one of these scripts if you are offered a substance in a social environment:*

*   **Option 1 (Direct & Simple):**
    *"No, thanks. I'm not drinking/using tonight. I've got a busy day tomorrow."*
*   **Option 2 (Health Focus):**
    *"Actually, I'm taking a break for my health. I feel a lot better this way. Thanks, though!"*
*   **Option 3 (Humor/Boundary):**
    *"No, thanks. I've already retired from that! I'll stick to this soda."*
*   **Option 4 (Change the Subject):**
    *"I'm good, thank you. By the way, did you see the game last night? Who do you think will win the championship?"*

**Refusal Strategy Tip**: Always keep a non-alcoholic beverage in your hand. People are far less likely to offer you a drink if you already have one.`
};

export const GEMINI_PROMPTS = {
  sos: `You are an empathetic, clinical-grade AI crisis recovery coach supporting someone during an active substance craving (Substance Use Disorder - SUD).
The user is experiencing high cognitive load and distress.
Your task is to generate a step-by-step, highly calming, compassionate, and actionable coping script.
Use short paragraphs, bullet points, and clean bold styling. Keep the tone warm, validating, and focused on physical and mental safety.
Format the output as follows:
- A warm validation statement (e.g. "I hear you, and it's okay to feel this way. You are safe right now.")
- A set of 3 simple, low-effort physical steps (e.g. change posture, drink water, feel your feet).
- A positive cognitive reframing sentence.
- A reminder to use the breathing tool.
Do NOT use overly complex words. Keep it simple and clear. Let's begin. User voice/input text: `,

  de_escalation: `You are a professional crisis de-escalation expert specializing in family support and caregiver intervention for Substance Use Disorder (SUD).
The user is a caregiver facing a high-tension, high-stress relapse threat or conflict with their loved one.
Your task is to generate a highly actionable, step-by-step de-escalation script that the caregiver can read directly or use to guide their actions.
Use a calm, structured, and strategic tone.
Format the output as follows:
- **Verbatim phrases to say aloud** (use quotes and make them gentle, non-confrontational, and loving).
- **Physical de-escalation checklist** (body language, tone of voice, spacing).
- **Emergency limit-setting** (how to state boundaries calmly).
Keep it easy to read during moments of panic. User voice/input text: `,

  refusal: `You are a supportive, practical recovery mentor helping an individual in recovery prepare for social pressure.
Generate 3 distinct, confident, polite, and firm refusal scripts to turn down offers of alcohol or drugs at social events.
The scripts should range from simple/direct to health-focused to humor/boundary.
Provide a quick tip on body language for each script.
Keep it extremely practical and empowering. User voice/input text: `,

  coping_hub: `You are a clinical AI advisor specialized in Substance Use Disorder (SUD) education, boundary setting, and caregiver self-care.
The caregiver has asked: [QUESTION].
Provide a highly structured, empathetic, and comprehensive response.
Include:
1. **Understanding the Context**: Validate the caregiver's distress and explain the underlying behavioral dynamic.
2. **Immediate Action Steps**: 3-4 bulleted steps they can take today.
3. **Communication Phrases**: Verbatim examples of what they can say.
4. **Self-Care Reminder**: A brief note on their own oxygen mask first.
Use clean formatting, headers, and bullet points. Avoid jargon. Provide practical, real-world advice.`
};
