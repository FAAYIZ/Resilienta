/**
 * Resilienta - Gemini GenAI Service
 * Handles interactive script generation and educational coping queries.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_PROMPTS, FALLBACK_SCRIPTS } from "../utils/constants";

// Helper to check if API key exists
const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

/**
 * Generates an emergency script using Gemini 1.5 Flash based on action type and voice context.
 * 
 * @param {string} actionType - 'sos', 'de_escalation', or 'refusal'
 * @param {string} voiceContext - Optional transcript from the user's voice input
 * @returns {Promise<string>} The generated script text
 */
export async function generateEmergencyScript(actionType, voiceContext = "") {
  const apiKey = getApiKey();
  
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    console.warn(`[GeminiService] API key not found. Using pre-verified fallback script for: ${actionType}`);
    return getFallbackScript(actionType, "API Key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Select correct prompt template
    const basePrompt = GEMINI_PROMPTS[actionType] || GEMINI_PROMPTS.sos;
    const finalPrompt = voiceContext 
      ? `${basePrompt}\nUser Voice Input / Additional Context: "${voiceContext}"`
      : `${basePrompt}\nNo additional context provided. Generate a generic helper script.`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response received from Gemini API.");
    }
    
    return text;
  } catch (error) {
    console.error("[GeminiService] Error calling Gemini API:", error);
    return getFallbackScript(actionType, error.message);
  }
}

/**
 * Asks a coping or educational boundary question to the Coping Hub.
 * 
 * @param {string} question - The custom or preset question
 * @returns {Promise<string>} Structured advice
 */
export async function askCopingQuestion(question) {
  const apiKey = getApiKey();
  
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
    console.warn("[GeminiService] API key not found. Using preset responses for Coping Hub.");
    return `### Educational Boundary Guide (Offline Mode)

It looks like the Gemini API Key is missing or invalid. Here are immediate tips for your question: **"${question}"**

1. **Safety First**: If you or your loved one are in immediate danger of relapse or self-harm, please contact local emergency services or the **988 Suicide & Crisis Lifeline** immediately.
2. **Clear Boundaries**: State what *you* will do, not what the other person must do. (e.g., "If you use substances in the house, I will ask you to leave for the night," rather than "You must stop using").
3. **Avoid Confrontation during Use**: Do not attempt to have complex emotional conversations while your loved one is under the influence. Wait until they are sober and cognitive load is lower.
4. **Oxygen Mask Rule**: You cannot pour from an empty cup. Attend support groups like Al-Anon, Nar-Anon, or SMART Recovery Family & Friends.`;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const basePrompt = GEMINI_PROMPTS.coping_hub.replace("[QUESTION]", question);
    
    const result = await model.generateContent(basePrompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response received from Gemini API.");
    }
    
    return text;
  } catch (error) {
    console.error("[GeminiService] Error asking coping question:", error);
    return `### Educational Boundary Guide (Fallback Response)
    
We encountered a network error while fetching advice: *"${error.message}"*.

Here are core coping practices you can rely on right now:
*   **Establish Loving Limits**: Let your loved one know you support their recovery, but you will not shelter them from the natural consequences of active substance use.
*   **Keep Communication Simple**: When cognitive load is high, use short sentences. Emphasize "I feel" statements rather than accusatory "You did" statements.
*   **Seek Community Support**: Caregiving is a marathon. Join a local or online support group to share experiences and reduce isolation.`;
  }
}

/**
 * Local helper to format fallback scripts with a friendly note.
 */
function getFallbackScript(type, reason) {
  const scripts = {
    sos: FALLBACK_SCRIPTS.sos,
    de_escalation: FALLBACK_SCRIPTS.de_escalation,
    refusal: FALLBACK_SCRIPTS.refusal
  };

  const selectedScript = scripts[type] || scripts.sos;
  
  return `> [!NOTE]
> **Resilienta Secure Fallback Mode Enabled**
> The system is currently running on localized protocols (Reason: ${reason}). These steps are curated from standard SUD crisis resources.

${selectedScript}`;
}
