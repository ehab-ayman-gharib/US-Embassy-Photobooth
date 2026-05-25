import { GoogleGenAI } from "@google/genai";
import { EraData, FaceDetectionResult, EraId } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const DASHBOARD_API_URL = "https://ai-photobooth-dashboard.vercel.app/api/projects/b5537414-76f0-429d-99aa-a1f1747f979b/generate";
/**
 * Increments the generated images count on the dashboard
 */
const incrementGeneratedCount = async () => {
  try {
    const response = await fetch(DASHBOARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      console.warn(`[Dashboard] Failed to increment count: ${response.status} ${response.statusText}`);
    } else {
      console.log('[Dashboard] Successfully incremented generation count');
    }
  } catch (error) {
    console.error('[Dashboard] Error calling increment API:', error);
  }
};

export interface GenerationResult {
  image: string;
  prompt: string;
}

export const generateHistoricalImage = async (
  base64Image: string,
  era: EraData,
  faceData: FaceDetectionResult
): Promise<GenerationResult> => {
  const ai = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // 1. Calculate Detailed Subject Description
  let subjectDescription = "";
  if (faceData.totalPeople > 1) {
    subjectDescription = `\n\nCRITICAL NOTE REGARDING SUBJECTS:\nThere are ${faceData.totalPeople} people detected in the uploaded reference photo. Ensure ALL of them are seamlessly integrated into the historical scene together, adhering to the same stylistic, lighting, and integration rules outlined above.`;
  }

  // 2. Construct Unified Prompt
  const isFemale = faceData.femaleCount > 0 && faceData.femaleCount >= faceData.maleCount;
  const genderIdentity = isFemale ? "female" : "male";

  let genderClothing = "";
  if (era.id === EraId.DECLARATION) {
    genderClothing = isFemale
      ? "- elegant 18th-century colonial women's formal dresses\n- period-accurate rich fabrics\n- realistic historical textures\n- elegant revolutionary-era clothing details"
      : "- dark colonial coats\n- waistcoats\n- cravats\n- period-accurate fabrics\n- realistic historical textures\n- elegant revolutionary-era clothing details";
  } else if (era.id === EraId.DELAWARE) {
    genderClothing = isFemale
      ? "authentic Revolutionary War-era women's clothing, such as a colonial dress with a cloak"
      : "authentic Revolutionary War-era clothing matching George Washington's style";
  }

  const eraPrompt = era.promptInstructions
    .replace(/\{\{GENDER_IDENTITY\}\}/g, genderIdentity)
    .replace(/\{\{GENDER_CLOTHING\}\}/g, genderClothing);

  const prompt = `${eraPrompt}${subjectDescription}`;

  console.log("------------------- GENERATED PROMPT -------------------");
  console.log(prompt);
  console.log("--------------------------------------------------------");

  // Using raw object structure to bypass potential TS mismatches with the SDK
  const safetySettings: any[] = [
    { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' }
  ];

  const requestConfig: any = {
    temperature: 0.5,
    // @ts-ignore
    imageConfig: {
      aspectRatio: "2:3",
      resolution: '1K'
    },
    safetySettings: safetySettings
  };

  try {
    // 4. Send to Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      config: requestConfig,
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: cleanBase64
              }
            },
            { text: prompt }
          ]
        }
      ]
    });

    // Extract image from response
    const candidate = response.candidates?.[0];
    if (candidate) {
      if (candidate.finishReason !== 'STOP') {
        console.warn('Gemini Generation Warning: Finish Reason:', candidate.finishReason);
      }

      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          // Increment dashboard count after successful generation
          incrementGeneratedCount();

          return {
            image: `data:image/jpeg;base64,${part.inlineData.data}`,
            prompt: prompt
          };
        }
      }
    }

    console.error('Gemini No Image Generated. Response:', JSON.stringify(response, null, 2));
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
