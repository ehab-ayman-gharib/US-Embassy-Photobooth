import { EraData, EraId } from './types';

export const ERAS: EraData[] = [
  {
    id: EraId.DELAWARE,
    name: 'Crossing The Delaware',
    description: 'Participate in the historic crossing of the Delaware beside George Washington.',
    promptInstructions: `Create an ultra-realistic cinematic historical recreation of the iconic "Washington Crossing the Delaware" scene.
Use the uploaded user photo as the facial reference for one of the soldiers standing directly beside George Washington inside the boat.
The user's face must remain fully recognizable and preserve their real {{GENDER_IDENTITY}} facial identity, skin texture, facial proportions, eye shape, nose, lips, and overall likeness exactly as in the uploaded image. Do not stylize, cartoonize, beautify, or alter the facial structure. Seamlessly integrate the user into the historical scene as if they were originally part of the painting recreation.
Position the user standing immediately next to George Washington INSIDE the wooden military boat. It must be absolutely clear that both the user and George Washington are physically standing inside the vessel, with the wooden hull, sides, and interior of the boat clearly visible around their lower bodies. They must NOT appear to be wading or standing on the ice/water. The icy water must remain firmly outside the boat.
The user must be wearing {{GENDER_CLOTHING}}, matching the fabric quality, colors, and military or colonial aesthetic of the era. The user must be looking in the exact same direction as George Washington with a matching heroic posture and body orientation. Adjust the user's body pose naturally to fit the composition while preserving facial identity from the uploaded image.

The environment should recreate the dramatic icy Delaware River crossing at dawn:
- frozen river
- wooden military boat
- floating ice
- foggy winter atmosphere
- cold blue-gray lighting
- soldiers rowing
- realistic water reflections
- historically accurate uniforms
- cinematic depth and realism

Style Requirements:
- hyper-realistic
- cinematic lighting
- photorealistic skin and fabric details
- historically authentic textures
- realistic shadows and atmospheric perspective
- extremely detailed facial integration
- seamless compositing
- natural anatomy and proportions
- epic historical composition

Image Quality Requirements:
- 8K ultra detailed
- HDR
- sharp focus
- professional cinematic color grading
- realistic film-level rendering

Composition Requirements:
- aspect ratio: 2:3 vertical (portrait)
- poster-style framing
- the wooden boat must be clearly visible and firmly contain the subjects
- subjects must clearly be INSIDE the boat, not standing on water
- user clearly visible beside George Washington
- maintain strong visual focus on both George Washington and the user
- no distortion
- no extra fingers
- no malformed anatomy
- no blurry face
- no duplicated people

The final result must look like a real cinematic photograph of the user participating in the historic crossing of the Delaware beside George Washington.`
  },
  {
    id: EraId.DECLARATION,
    name: 'Declaration of Independence',
    description: 'Join the founding fathers at the signing of the Declaration of Independence.',
    promptInstructions: `Create an ultra-realistic cinematic historical recreation inspired directly by the classic composition and staging of the famous "Signing of the Declaration of Independence" painting.
The image composition must recreate the visual structure and staging of the famous painting of signing the Declaration of Independence. The camera should capture a wide view of a large colonial assembly hall from a slightly elevated eye-level perspective. The room should feel deep and crowded with historical figures arranged across the foreground, midground, and background.
A long dark wooden table should sit slightly right of center in the composition, covered with parchment papers and historical documents. The main signing figure should stand beside the table as the central visual focus of the scene.
Several important historical figures should stand closely grouped around the signing table in the middle of the room, forming the visual centerpiece. Their bodies should face toward the table while their heads, eyes, and attention remain directed toward the signing process.
Large groups of founding fathers should sit along the left side of the room in rows of chairs and benches, wearing formal 18th-century clothing. Additional standing figures should appear on the right side near the walls and curtains, creating balanced visual weight across the image.
Most people in the room should visually direct their attention toward the center signing area, creating a strong focal flow toward the signing table.

The uploaded user(s) should be positioned standing directly behind the signing table in the central group, appearing just behind and slightly to the right of the main presenting figure. While the rest of the crowd watches the signing, the user should uniquely engage the viewer from this central background position.
The user's body posture should be a clear front-facing pose:
- upright standing position
- relaxed but dignified shoulders
- hands naturally positioned
- body and torso squared directly toward the camera (front pose, NOT a side profile)
- head facing straight forward
- eyes looking directly into the camera lens
- full front facial orientation
- the user must visually appear to be breaking the fourth wall, observing the viewer directly from within the historical scene

The scene should maintain strong triangular visual composition leading the viewer's eye from the seated figures on the left toward the central standing group and finally toward the signing table on the right.
Tall red draped curtains should frame both sides of the room while warm light falls across the center figures and table, leaving parts of the background darker to create dramatic cinematic depth.
The scene should capture the dramatic historical moment where the primary signer is standing at the central table presenting or signing the Declaration while the surrounding founding fathers observe from their historically accurate positions.

Use the uploaded user photo as the facial reference for the specific historical figure standing directly behind the signing table, located just behind and to the right of the primary presenting figure. The user must NOT replace the main signer or alter the iconic structure of the painting. Instead, seamlessly integrate the user into this specific central-background position exactly as if they were originally painted into the scene.
The user's face must remain fully recognizable and preserve their real {{GENDER_IDENTITY}} facial identity, skin texture, facial proportions, eye shape, nose, lips, and overall likeness exactly as in the uploaded image. Do not stylize, cartoonize, beautify, or alter the facial structure.
Dress the user in historically accurate 18th-century colonial formal clothing appropriate for their gender:
{{GENDER_CLOTHING}}

Adjust the user's body pose naturally to fit the exact staging and posture style of the surrounding historical figures while preserving facial identity.
The environment must recreate the historical assembly hall exactly in the style of the reference image:
- large colonial chamber
- tall walls and draped curtains
- wooden floors
- historical desks and chairs
- parchment documents
- warm candlelit atmosphere
- natural window lighting
- dramatic shadows
- realistic architectural depth
- historically accurate interior details

Style Requirements:
- hyper-realistic
- cinematic historical photography style
- direct recreation of the reference painting composition
- photorealistic skin and fabric details
- historically authentic textures
- realistic shadows and atmospheric lighting
- extremely detailed facial integration
- seamless compositing
- natural anatomy and proportions
- epic historical composition
- realistic depth of field
- museum-quality realism

Image Quality Requirements:
- 8K ultra detailed
- HDR
- sharp cinematic focus
- professional cinematic color grading
- realistic film-quality rendering
- highly detailed clothing and environment textures

Composition Requirements:
- ALWAYS use aspect ratio: 2:3 vertical (portrait)
- poster-style framing
- preserve the exact composition language of the reference artwork
- maintain the exact crowd positioning and visual flow toward the signing table for the historical figures
- the user MUST break this flow by facing forward and looking directly at the camera
- the signing figure must remain the visual focal point
- user clearly visible among the founding fathers
- maintain balanced cinematic composition
- no distortion
- no extra fingers
- no malformed anatomy
- no blurry face
- no duplicated people

The final result must look like a real cinematic photograph recreating the exact composition and atmosphere of the iconic Declaration of Independence painting while naturally integrating the user into the historical moment.`
  }
];