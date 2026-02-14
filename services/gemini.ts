
import { GoogleGenAI, Type } from "@google/genai";
import { ClassificationResult, ReuseInstruction, Language, Tool } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const classifyMaterial = async (base64Image: string, lang: Language): Promise<ClassificationResult> => {
  const langText = lang === 'ta' ? 'Tamil' : 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: `Analyze this object for an upcycling and recycling app. 
        
        CLASSIFICATION CATEGORIES:
        - 'Reusable': Suitable for creative DIY crafts, upcycling projects, or repurposing (e.g., plastic bottles, jars, cardboard).
        - 'Non-Reusable': Items that are too small, soiled, or structurally unfit for any reuse or upcycling.
        - 'Hazardous': Lab glassware, medical waste, chemical containers, or electronic waste.

        CRITICAL CONTEXT: 
        Even if a plastic bottle (like PET) is "single-use" for drinking, it is HIGHLG REUSABLE for crafts (planters, lamps, etc.). You MUST classify standard household plastic containers and bottles as 'Reusable' unless they are contaminated or hazardous.
        
        Provide:
        1. classification: 'Reusable', 'Non-Reusable', or 'Hazardous'.
        2. reason: Explain WHY it's good for upcycling or why it's hazardous.
        3. materialName: Common name of the item.
        4. impactMessage: A short, encouraging environmental impact fact.
        5. suggestions: Array of {title, description} for creative project ideas.

        Respond in ${langText}. Return JSON.` }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING, enum: ['Reusable', 'Non-Reusable', 'Hazardous'] },
          reason: { type: Type.STRING },
          materialName: { type: Type.STRING },
          impactMessage: { type: Type.STRING },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          }
        },
        required: ['classification', 'reason', 'materialName', 'impactMessage']
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateReuseInstructions = async (
  materialName: string, 
  projectName: string, 
  tools: Tool[], 
  lang: Language
): Promise<ReuseInstruction> => {
  const langText = lang === 'ta' ? 'Tamil' : 'English';
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide step-by-step instructions to make a "${projectName}" from a "${materialName}" using ONLY these tools: ${tools.join(', ')}. Respond in ${langText}. Return a JSON object with projectName, material, steps (step number, instruction, and a visualPrompt), and a youtubeSearchQuery.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          material: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                step: { type: Type.INTEGER },
                instruction: { type: Type.STRING },
                visualPrompt: { type: Type.STRING }
              }
            }
          },
          youtubeSearchQuery: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
