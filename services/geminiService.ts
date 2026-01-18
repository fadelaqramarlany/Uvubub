import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

// Initialize Gemini
// NOTE: In a real production app, ensure API_KEY is set in your environment variables
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getMenuRecommendation = async (userPreference: string): Promise<string> => {
  if (!apiKey) {
    return "Maaf, fitur AI sedang tidak tersedia (API Key missing). Silakan cek menu kami secara manual.";
  }

  const menuContext = MENU_ITEMS.map(item => `${item.name} (${item.category}): ${item.description}`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        You are a friendly and professional waiter at "Ma-Bac Korean BBQ" in Medan, Indonesia.
        
        The user asks: "${userPreference}"
        
        Here is our menu:
        ${menuContext}
        
        Please recommend 2-3 specific items from our menu that match their preference. 
        Explain why you chose them in a tempting way.
        Keep the response short (under 100 words), use Indonesian language (Bahasa Indonesia), 
        and be enthusiastic (tone: ramah, menggugah selera).
      `,
    });

    return response.text || "Maaf, saya sedang kesulitan memilih menu untuk Anda. Cobalah lihat bagian Best Seller kami!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan pada asisten virtual kami. Silakan tanya pramusaji kami langsung!";
  }
};