import { GoogleGenAI } from "@google/genai";
import { EraData, FaceDetectionResult } from '../types';
import { MALE_WARDROBE_STYLES, FEMALE_WARDROBE_STYLES, COMPANION_CHARACTERS, CHUCK_E_CHEESE, getIdentityPreservationGuide, LIGHTING_STYLES, EGYPT_LANDMARKS, USA_LANDMARKS } from '../constants';

let lastMaleWardrobeIndex = -1;
let lastFemaleWardrobeIndex = -1;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

const DASHBOARD_API_URL = "https://ai-photobooth-dashboard.vercel.app/api/projects/0f71cbcd-ef2d-4213-a3db-94fe7da6a805/generate";

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

  // 1. Calculate Detailed Subject & Gender Reflection
  let subjectDescription = "";
  const parts = [];
  if (faceData.maleCount > 0) parts.push(`${faceData.maleCount} ${faceData.maleCount > 1 ? 'men' : 'man'}`);
  if (faceData.femaleCount > 0) parts.push(`${faceData.femaleCount} ${faceData.femaleCount > 1 ? 'women' : 'woman'}`);
  if (faceData.childCount > 0) parts.push(`${faceData.childCount} ${faceData.childCount > 1 ? 'children' : 'child'}`);

  if (parts.length === 0) {
    subjectDescription = faceData.totalPeople > 1 ? `a group of ${faceData.totalPeople} people` : "a person";
  } else if (faceData.totalPeople === 1) {
    subjectDescription = parts[0];
  } else {
    subjectDescription = "a group of " + parts.join(', ').replace(/, ([^,]*)$/, ' and $1');
  }

  // 2. Select Wardrobe - Preserving the user's original outfit as-is
  const clothingDescription = "the user's original clothing from the reference image, preserved exactly without any changes, modifications, or replacements";

  // 3. Select Lighting Variant
  const randomLighting = LIGHTING_STYLES[Math.floor(Math.random() * LIGHTING_STYLES.length)];
  const randomEgyptLandmark = EGYPT_LANDMARKS[Math.floor(Math.random() * EGYPT_LANDMARKS.length)];
  const randomUsaLandmark = USA_LANDMARKS[Math.floor(Math.random() * USA_LANDMARKS.length)];

  // 4. Select Random Companions
  const shuffledCompanions = [...COMPANION_CHARACTERS].sort(() => 0.5 - Math.random());
  const selectedCompanions = shuffledCompanions.slice(0, 2);
  const identityPreservationGuide = getIdentityPreservationGuide(selectedCompanions);
  const allCharacters = [CHUCK_E_CHEESE, ...selectedCompanions];
  const characterNames = allCharacters.map(c => c.name).join(', ');

  const posesText = allCharacters.map(c => c.pose).join(' ');
  const descriptionsText = allCharacters.map(c => `    * ${c.name}: ${c.description}`).join('\n');
  const attiresText = allCharacters.map(c => c.attire).join('; ');

  // 5. Construct Unified Prompt
  const prompt = `Generate a breathtaking, ultra-high-budget, cinematic 3D CGI masterpiece (Unreal Engine 5 path-traced rendering style). The absolute primary focus and dominant subject of the entire image MUST be ${subjectDescription} standing shoulder-to-shoulder with 3 iconic Chuck E. Cheese characters, formatted as a dynamic, closely-framed friendly group portrait.

  CORE PORTRAIT COMPOSITION (MAIN FOCUS):
  - COMPOSITION: A beautiful, dynamic group shot showing the human subjects and the characters standing shoulder-to-shoulder as best friends. Frame the subjects closely (e.g. from the waist up) to strongly emphasize their faces, expressions, and interactions. The characters must dominate the frame, framing the human subject who is the central focus.
  - POSES & INTERACTION: ${posesText}
  - NATURAL HEIGHTS & PROPORTIONS: All subjects must be rendered with perfect anatomically proportional human body scales, natural leg-to-torso ratios, and realistic adult heights. The human subjects must stand at their natural human height relative to their head sizes. Absolutely avoid shrunken, dwarfed, or short-legged body structures for humans. The mascot characters must have natural heights matching average adult human height (shoulder-to-shoulder with the human).
  - SHARP BACKGROUND FOCUS: The entire background environment must be rendered in crystal-clear, sharp focus with an infinite depth of field. The background elements must be highly detailed, vivid, and fully visible without any bokeh, soft-focus, or blur.

  SCENIC BACKGROUND BLEND (SOFT-FOCUS FRAME):
  - BACKGROUND SCENE: ${era.name}. ${era.promptInstructions.replace('[EGYPT_LANDMARK]', randomEgyptLandmark).replace('[USA_LANDMARK]', randomUsaLandmark)}. ${era.description}.
  - US FLAG & ZIPLINE: The United States (US) flag and the metallic zipline arcing overhead should be beautifully integrated into the background, rendered in sharp detail.
  - SKY & GROUND: A beautiful, unified, moody twilight sky transitioning into evening, filled with deep blues, cool teals, and soft purple clouds, stretching across the entire background behind both ${randomEgyptLandmark} and ${randomUsaLandmark}. The stone pavement ground is cool and atmospheric, reflecting the teal ambient light and soft distant city lights.

  CHARACTERS & SUBJECTS STYLE (UNIFIED 3D CGI AESTHETIC):
  - HUMAN SUBJECT (CINEMATIC 3D CGI STYLIZATION): The human subject MUST be rendered in the exact same high-budget, ultra-detailed 3D CGI aesthetic as the rest of the image (like a hyper-realistic MetaHuman or top-tier CGI feature film character). They should seamlessly blend into the stylized 3D animated world while perfectly retaining their true likeness.
  - CHUCK E. CHEESE MASCOTS (HIGH-END 3D CGI): You MUST include the three official characters (${characterNames}). They MUST be rendered as high-budget, cinematic 3D CGI animated feature-film characters perfectly integrated into the scene. They must have ultra-detailed, tangible physical materials, incredibly realistic fur/feathers with millions of individual strands, and hyper-detailed PBR clothing textures.
${descriptionsText}
  - CLOTHING & TRANSFORMATION (PRESERVE USER'S OUTFIT): You MUST PRESERVE the human subjects' original clothing EXACTLY as it appears in the reference image. Do NOT change, replace, or modify their outfits, styles, colors, fabrics, or garments. Keep the human subjects' original clothing completely intact and unchanged. The Chuck E. Cheese characters MUST wear their respective high-quality custom premium Chuck E. Cheese attire (${attiresText}). Ensure all clothing fabrics show distinct, high-resolution PBR textile patterns, detailed stitching, and realistic physical folds.
  - CRITICAL EXPRESSION & IDENTITY LOCK: Maintain the EXACT facial features, bone structure, skin tone, and FACIAL EXPRESSION of the human subjects in the reference image. Do NOT force the human to smile if they are not smiling in the reference. Preserve their exact, natural expression. Each person's face must retain 100% identical likeness to the source, perfectly translated into the high-end 3D CGI aesthetic.

  LIGHTING & ATMOSPHERE:
  - LIGHTING STYLE: ${randomLighting}
  - CINEMATIC TEAL & AMBER LIGHTING (HIGH CONTRAST): The lighting MUST be extremely cinematic and high-contrast, using a classic blockbuster 'Teal and Orange' color grading. Use a dramatic, directional cool teal/blue rim light coming from the side/back, contrasting with deep, rich, dark shadows. The cool teal light creates brilliant, glowing rim highlights on the edges of the characters' hair, fur, and clothes. Add a very subtle, soft warm ambient fill light on their faces to preserve natural skin tones. This high-contrast lighting makes the image look like a moody, ultra-premium, high-end cinematic movie still.

  ${identityPreservationGuide}

  MANDATORY NEGATIVE RULES (DO NOT GENERATE):
  * no cheap foam mascot costume, no cosplay, no humans in animal suits, no theme park actors, no physical mascot performers
  * no flat cartoon, no 2D illustration, no anime style, no cel shading, no low-poly rendering, no plastic-like skin, no vinyl skin
  * no altered facial structure, no distorted anatomy, no shrunken bodies, no dwarfed or shortened legs, no compressed heights, no disproportionate heads, no deformed limbs, no hairstyle changes, no warped eyes
  * no characters riding the zipline`;

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
    temperature: 0.3,
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
