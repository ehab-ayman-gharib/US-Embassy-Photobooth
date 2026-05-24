import { EraData, EraId, Character } from './types';

export const CHUCK_E_CHEESE: Character = {
  name: "Chuck E. Cheese",
  description: "A cinematic, high-detail grey mouse character. He has extremely fine, realistic, short grey-brown fur with millions of individually-rendered, soft, organic hair strands that catch the light with soft specular highlights. Soft, warm, friendly green glass eyes with relaxed eyelids and deep iris detail. A friendly, gentle smiling mouth showing his white front teeth. A soft pink inner-ear texture with realistic subsurface scattering (backlight glowing through the ears). He wears a high-quality fabric purple crewneck jersey t-shirt with a green collar, green sleeve bands, and an embroidered yellow-green \"C\" logo.",
  pose: "Chuck E. Cheese (the grey mouse) stands on the left, smiling warmly with his hand placed friendly on the subject's shoulder or standing right next to him.",
  attire: "Chuck E. Cheese: purple jersey crewneck"
};

export const COMPANION_CHARACTERS: Character[] = [
  {
    name: "Helen Henny",
    description: "A gorgeous, cinematic white chicken character. Her face and arms are covered in beautifully layered, fluffy realistic white feathers. She has light blue eyeshadow over soft, warm glossy blue eyes, and a friendly smiling matte-textured orange beak. Her hair is fluffy, speckled black and white, styled in two puffy sections tied with purple bows. She wears a black bodice top with a high purple collar, and a shiny, metallic purple pleated skirt. She has yellow bird legs and wears grey and white sneakers with white laces.",
    pose: "Helen Henny stands immediately behind them, framing the subject.",
    attire: "Helen Henny: black bodice top with a high purple collar, shiny metallic purple pleated skirt, and grey and white sneakers"
  },
  {
    name: "Mr. Munch",
    description: "A highly detailed, large, bulky shaggy purple monster character. He is covered in extremely realistic, long, fluffy purple fur. He has a tuft of spiky blonde hair on his head and thick blonde eyebrows. His face features a lighter purple muzzle with two small nostrils, soft friendly eyes with green irises, and a warm, relaxed, happy smile showing white teeth. He wears a layered shirt consisting of an orange short-sleeved t-shirt with yellow trim and a large purple 'M' logo (with yellow and green diamond accents), worn over green elbow-length sleeves. He wears brown trousers and large purple shoes with orange accents.",
    pose: "Mr. Munch stands on the right foreground/shoulder-to-shoulder, making a friendly thumbs-up or happy gesture.",
    attire: "Mr. Munch: orange short-sleeved t-shirt with yellow trim and a purple 'M' logo, layered over green elbow-length sleeves, brown trousers, and purple shoes with orange accents"
  },
  {
    name: "Jasper T. Jowls",
    description: "A friendly, highly-detailed cinematic brown hound dog character. He is covered in realistic short brown fur with long, dark floppy ears and a lighter tan muzzle covered in subtle dark freckles. He has warm, friendly eyes with relaxed eyebrows, a large shiny black dog nose, and a gentle, happy smile. He wears a white long-sleeved shirt with black spots, blue overalls, a red neckerchief bandana tied around his neck, and red and white sneakers. He is holding a tan straw hat with a red band.",
    pose: "Jasper T. Jowls stands leaning in happily from the right, with a welcoming posture.",
    attire: "Jasper T. Jowls: white long-sleeved shirt with black spots, blue overalls, red neckerchief bandana, red and white sneakers, holding a tan straw hat with a red band"
  },
  {
    name: "Pasqually",
    description: "A jovial, highly-detailed cinematic animated human chef character. He has warm, realistic peach skin with subtle subsurface scattering, black hair around the sides, thick black eyebrows, a large prominent black mustache that curls slightly at the ends, a large rounded peach nose, warm friendly eyes with relaxed eyelids, and a gentle, welcoming smile showing teeth. He wears a classic puffy white chef's hat, a light blue short-sleeved collared shirt under a white chef's apron with two front pockets, beige trousers rolled up at the cuffs, and brown shoes.",
    pose: "Pasqually stands proudly behind the group, gesturing towards them with a warm Italian chef's enthusiasm.",
    attire: "Pasqually: classic puffy white chef's hat, light blue short-sleeved collared shirt, white chef's apron with two front pockets, beige trousers rolled up at the cuffs, and brown shoes"
  },
  {
    name: "Bella Bunny",
    description: "A sweet, highly-detailed cinematic light-brown bunny character. She is covered in incredibly soft, fine realistic light brown and white fur that catches the light beautifully. She has tall bunny ears with soft pink inner texturing, soft, warm brown eyes with long eyelashes, a cute pink nose, and a gentle, friendly smile showing buck teeth. She wears a pink dress and a pink bow in her hair.",
    pose: "Bella Bunny stands close by, waving happily with a sweet smile.",
    attire: "Bella Bunny: pink dress and a pink bow"
  }
];

export const getIdentityPreservationGuide = (companions: Character[]) => {
  const allCharacters = [CHUCK_E_CHEESE, ...companions];
  
  const posesText = allCharacters.map(c => c.pose).join(' ');
  const descriptionsText = allCharacters.map(c => `  * ${c.name.toUpperCase()}: ${c.description}`).join('\\n');
  const attiresText = allCharacters.map(c => c.attire).join('; ');

  return `STRICT VISUAL REQUIREMENTS (NO DEVIATIONS ALLOWED):
- CRITICAL EXPRESSION & IDENTITY LOCK: You MUST maintain the EXACT facial features, bone structure, skin tone, and FACIAL EXPRESSION of the human subjects in the reference image. DO NOT force the human to smile if they are not smiling in the reference. Every human face must remain 100% identical in likeness to the original person, flawlessly translated into the high-end cinematic 3D CGI aesthetic without losing their true identity. No cartoonish distortion on human faces is allowed.
- COMPOSITION & CHARACTER FOCUS (MAIN FOCAL POINT): The entire generation MUST be a dynamic, closely-framed group shot focusing completely on the human subject and the Chuck E. Cheese characters standing shoulder-to-shoulder as best friends. The characters must dominate the frame, taking up 70% of the composition.
  * INTIMATE GROUP SHOT: Frame the subjects closely (e.g., from the waist up) to strongly emphasize their faces, expressions, and interactions. The characters are standing extremely close, crowding in happily around the user to create a warm, friendly portrait. ${posesText}
  * CRITICAL PROPORTIONS & NATURAL HEIGHT RATIOS: All subjects (both human subjects and characters) MUST be rendered with perfectly natural, realistic, and anatomically proportional body heights, leg-to-torso ratios, and limb lengths. The human subjects MUST stand at their natural human height relative to their head size. Absolutely avoid shrunken, dwarfed, or short-legged body structures for humans. The characters must have proportional heights: Chuck E. Cheese (the mouse) and Mr. Munch (the monster) stand standing naturally at average adult human height (shoulder-to-shoulder with the human), and Helen Henny stands naturally at average adult height. No deformed, distorted, or compressed legs/torsos.
  * SHARP BACKGROUND FOCUS: The background landmarks (the Egyptian and USA landmarks, flags, and the Chuck E. Cheese restaurant) MUST be rendered in crystal-clear, sharp focus with an infinite depth of field. Do NOT use any bokeh, blur, or soft-focus on the background. All scenic elements must be fully visible and highly detailed.
- CHARACTER AESTHETIC & REALISM (UNIFIED 3D CGI MASTERPIECE):
  * The characters and the human subject MUST be rendered as high-fidelity, cinematic 3D CGI animated feature-film characters (like a high-budget Unreal Engine 5 path-traced render). They MUST NOT look like cheap foam mascot costumes, walkaround theme park performers, mascot suits, or flat 2D cartoons. All subjects must belong perfectly within the same stylized 3D world.
${descriptionsText}
- PORTRAIT WARDROBE INTEGRATION:
  * The human subject's original clothing (style, colors, and garments) MUST be preserved EXACTLY as-is from the reference image. Do NOT modify, replace, or alter the user's outfit.
  * The Chuck E. Cheese characters MUST wear their respective iconic high-quality custom premium Chuck E. Cheese attire (${attiresText}).
  * All clothing must be rendered with physically-based rendering (PBR) showing highly detailed woven textile patterns, realistic stitching on seams, and natural physical folds/draping.
- CINEMATIC TEAL & AMBER LIGHTING (HIGH CONTRAST & DRAMATIC):
  * TEAL RIM LIGHTING: The scene must use high-contrast, directional cool teal/blue lighting coming from the side/back. AVOID flat, bright, or overexposed global lighting.
  * DEEP RICH SHADOWS: The unlit sides of the characters and the human subject MUST fall into deep, rich, moody shadows to create dramatic cinematic depth.
  * SUBSURFACE SCATTERING & RIM LIGHT: The intense teal side-light creates brilliant, glowing cool highlights along the edges of hair and fur, contrasting beautifully against a soft warm ambient fill light on the faces.
  * ATMOSPHERIC GROUND: The characters stand on a cool, shadowed stone-paved walkway reflecting the teal ambient light, with dramatic cast shadows.
- SCENIC ELEMENTS:
  * ZIPLINE SEPARATION: A highly visible, sleek metallic zipline arcs dramatically across the upper sky, acting as a symbolic cinematic divider connecting and separating the Egyptian world (left) and the New York world (right).
  * FLAGS POSITIONS (CRITICAL LOCATION MATCHING): Waving flags of both nations MUST be beautifully integrated in the background, fully visible and sharp. The Egyptian flag MUST be located strictly on the left side of the background, and the United States (US) flag MUST be located strictly on the right side of the background, matching each country's landmarks perfectly and never reversed.`;
};

/**
 * LIGHTING_STYLES:
 * Variations of the celebration atmosphere.
 */
export const LIGHTING_STYLES = [
  "High-contrast, dramatic teal and orange cinematic lighting, casting deep moody shadows and intense cool blue rim highlights.",
  "Ultra-realistic blockbuster cinematic lighting. A cool teal side-light creates deep shadows, contrasting with a soft warm ambient glow on the faces.",
  "A breathtaking, moody twilight setup. Brilliant teal blue rim highlights pop against deep, rich, natural shadows.",
  "Cinematic, epic low-key blue hour lighting. Cool blue and purple tones in the sky reflect beautifully on the edges of the subjects, leaving the rest in cinematic shadow.",
  "A harmonious blend of intense directional teal moonlight and deep, rich shadows, creating an ultra-premium, highly-photorealistic cinematic atmosphere."
];

/**
 * MALE_WARDROBE_STYLES:
 * Custom celebratory Chuck E. Cheese attire for men.
 */
export const MALE_WARDROBE_STYLES = [
  "a modern, high-quality, custom Chuck E. Cheese purple crewneck jersey t-shirt (deep purple body, vibrant green sleeve bands, and a green collar, featuring a large, iconic yellow-green 'C' logo embroidered in the center of the chest) and classic blue jeans. The clothing features highly realistic stitching, folds, natural cloth simulation, and ultra-detailed tactile fabric texture response."
];

/**
 * FEMALE_WARDROBE_STYLES:
 * Custom celebratory Chuck E. Cheese attire for women.
 */
export const FEMALE_WARDROBE_STYLES = [
  "a modern, high-quality, custom Chuck E. Cheese purple crewneck jersey t-shirt (deep purple body, vibrant green sleeve bands, and a green collar, featuring a large, iconic yellow-green 'C' logo embroidered in the center of the chest) and classic blue jeans. The clothing features highly realistic stitching, folds, natural cloth simulation, and ultra-detailed tactile fabric texture response."
];

/**
 * LANDMARKS:
 * Arrays of landmarks to be randomized.
 */
export const EGYPT_LANDMARKS = [
  "the Great Pyramids of Giza",
  "the majestic Great Sphinx",
  "the historic Luxor Temple",
  "the ancient Karnak Temple",
  "the monumental Abu Simbel Temples"
];

export const USA_LANDMARKS = [
  "the Statue of Liberty and Manhattan skyline",
  "the iconic Golden Gate Bridge",
  "the famous Hollywood Sign",
  "the towering Empire State Building",
  "the monumental Mount Rushmore"
];

/**
 * ERAS:
 * Representing different background scenic configurations blending US and Egypt.
 */
export const ERAS: EraData[] = [
  {
    id: EraId.GUARDIAN, 
    name: 'Embassy Celebration',
    description: 'A cinematic 4th of July celebration at the US Embassy in Egypt, blending the Pyramids of Giza and the Statue of Liberty under fireworks.',
    promptInstructions: 'The scene is an epic, horizontal side-by-side transition blending [EGYPT_LANDMARK] on the left with [USA_LANDMARK] on the right, all set under a beautiful, unified, vibrant golden hour sunset sky filled with soft, majestic clouds painted in warm orange, pink, and amber tones. A classic Chuck E. Cheese restaurant with a glowing, bright neon sign is beautifully integrated into the environment. Waving flags of both nations are proudly displayed in the background: the waving Egyptian flag is positioned strictly on the left side next to [EGYPT_LANDMARK], and the waving United States flag is positioned strictly on the right side next to [USA_LANDMARK], matching each respective country\'s landmark and never reversed. A sleek metallic zipline arcs elegantly overhead as a dividing element. The ground is a warm, sunlit stone-paved walkway.'
  }
];