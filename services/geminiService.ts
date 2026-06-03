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

/**
 * Builds a detailed subject description block for the image generation prompt
 * using the actual face detection counts and genders.
 */
const buildSubjectDescription = (faceData: FaceDetectionResult, era: EraData): string => {
  const { maleCount, femaleCount, childCount, totalPeople } = faceData;
  const lines: string[] = [];

  // --- Header: tell the model exactly how many people to integrate ---
  if (totalPeople === 1) {
    lines.push(`Use the uploaded photo as the facial reference. There is exactly 1 person in the photo who must be seamlessly integrated into the historical scene.`);
  } else {
    lines.push(`CRITICAL — MULTIPLE SUBJECTS: There are exactly ${totalPeople} people detected in the uploaded reference photo. Every single one of them must be seamlessly integrated into the historical scene together. Do NOT omit anyone.`);
  }

  // --- Per-gender identity & clothing instructions ---
  const isDeclaration = era.id === EraId.DECLARATION;

  // Males
  if (maleCount > 0) {
    const maleLabel = maleCount === 1 ? "1 adult male" : `${maleCount} adult males`;
    const maleClothing = isDeclaration
      ? "dark colonial coat, waistcoat, cravat, knee breeches, white stockings, and buckled shoes — matching the surrounding founding fathers"
      : "authentic Revolutionary War-era military uniform matching George Washington's style — dark blue regimental coat with brass buttons, buff waistcoat, and tricorn hat";
    lines.push(`• ${maleLabel}: Preserve each male's real facial identity exactly — skin tone, facial proportions, eye shape, nose, lips, facial hair, and overall likeness. Do not stylize, cartoonize, beautify, or alter any facial structure. Dress each male in historically accurate 18th-century ${maleClothing}.`);
  }

  // Females
  if (femaleCount > 0) {
    const femaleLabel = femaleCount === 1 ? "1 adult female" : `${femaleCount} adult females`;
    const femaleClothing = isDeclaration
      ? "elegant 18th-century colonial women's formal dress with period-accurate rich fabrics, lace details, and refined accessories appropriate to the revolutionary era"
      : "authentic Revolutionary War-era women's clothing such as a sturdy colonial dress with a warm traveling cloak, bonnet, and practical period-accurate layers suitable for a winter river crossing";
    lines.push(`• ${femaleLabel}: Preserve each female's real facial identity exactly — skin tone, facial proportions, eye shape, nose, lips, hair style, and overall likeness. Do not stylize, cartoonize, beautify, or alter any facial structure. Dress each female in ${femaleClothing}.`);
  }

  // Children
  if (childCount > 0) {
    const childLabel = childCount === 1 ? "1 child" : `${childCount} children`;
    const childClothing = isDeclaration
      ? "smaller-scale 18th-century colonial children's formal clothing matching the adult style of the era"
      : "smaller-scale Revolutionary War-era children's clothing appropriate for a winter military crossing";
    lines.push(`• ${childLabel}: Preserve each child's youthful facial features exactly — rounder face, proportionally larger eyes, smaller stature. Dress each child in ${childClothing}. Position children naturally near the adults.`);
  }

  // --- Universal identity preservation emphasis ---
  lines.push(`\nIDENTITY PRESERVATION RULES (apply to ALL ${totalPeople} subject(s)):\n- Each person's face must remain fully recognizable and match the uploaded photo exactly.\n- Preserve real skin texture, facial proportions, eye color, eye shape, nose shape, lip shape, jawline, hairline, facial hair, and overall likeness.\n- Do NOT stylize, cartoonize, beautify, age, de-age, or alter any facial structure.\n- Seamlessly integrate each person into the historical scene as if they were originally part of the painting.`);

  return lines.join("\n");
};

export const generateHistoricalImage = async (
  base64Image: string,
  era: EraData,
  faceData: FaceDetectionResult
): Promise<GenerationResult> => {
  const ai = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

  // 1. Build detailed subject description from face detection data
  const subjectDescription = buildSubjectDescription(faceData, era);

  // 2. Construct Unified Prompt
  const prompt = era.promptInstructions
    .replace(/\{\{SUBJECT_DESCRIPTION\}\}/g, subjectDescription);

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
