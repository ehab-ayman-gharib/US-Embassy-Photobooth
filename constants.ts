import { EraData, EraId } from './types';

export const ERAS: EraData[] = [
  {
    id: EraId.DELAWARE,
    name: 'Crossing The Delaware',
    description: 'Participate in the historic crossing of the Delaware beside George Washington.',
    promptInstructions: `Create an ultra-realistic cinematic historical recreation of the iconic "Washington Crossing the Delaware" scene.

{{SUBJECT_DESCRIPTION}}

Position the subject(s) standing immediately next to George Washington INSIDE the wooden military boat. It must be absolutely clear that all subjects and George Washington are physically standing inside the vessel, with the wooden hull, sides, and interior of the boat clearly visible around their lower bodies. They must NOT appear to be wading or standing on the ice/water. The icy water must remain firmly outside the boat.
All subjects must be looking in the exact same direction as George Washington with a matching heroic posture and body orientation. Adjust body poses naturally to fit the composition while preserving each person's facial identity from the uploaded image.

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
- all subjects clearly visible beside George Washington
- maintain strong visual focus on both George Washington and the subjects
- no distortion
- no extra fingers
- no malformed anatomy
- no blurry face
- no duplicated people

The final result must look like a real cinematic photograph of the subject(s) participating in the historic crossing of the Delaware beside George Washington.`
  },
  {
    id: EraId.DECLARATION,
    name: 'Declaration of Independence',
    description: 'Join the founding fathers at the signing of the Declaration of Independence.',
    promptInstructions: `Create an ultra-realistic cinematic historical recreation inspired directly by the classic composition and staging of the famous "Signing of the Declaration of Independence" painting.
The image composition must capture a medium-close, intimate view of the famous signing of the Declaration of Independence. The camera should frame a tighter shot focused directly on the signing table and the immediate central figures, rather than a wide view of the entire assembly hall. The composition should avoid large crowds, focusing only on a small, select group of key founding fathers gathered closely around the table.
A long dark wooden table should sit in the foreground or midground, covered with parchment papers and historical documents. The main signing figure should stand directly beside the table as the central visual focus of the scene.
A few important historical figures should stand closely grouped around the signing table, forming the visual centerpiece. Their bodies should face toward the table while their heads, eyes, and attention remain directed toward the signing process.
Do NOT include large crowds or rows of seated people in the background. Keep the scene focused and intimate around the signing area.
The few people present should visually direct their attention toward the center signing area, creating a strong focal flow toward the signing table.

{{SUBJECT_DESCRIPTION}}

The subject(s) should be positioned standing directly behind the signing table in the central group, appearing just behind and slightly to the right of the main presenting figure. While the rest of the crowd watches the signing, the subject(s) should uniquely engage the viewer from this central background position.
Each subject's body posture should be a clear front-facing pose:
- upright standing position
- relaxed but dignified shoulders
- hands naturally positioned
- body and torso squared directly toward the camera (front pose, NOT a side profile)
- head facing straight forward
- eyes looking directly into the camera lens
- full front facial orientation
- the subject(s) must visually appear to be breaking the fourth wall, observing the viewer directly from within the historical scene

The scene should maintain a strong visual composition leading the viewer's eye toward the central standing group and the signing table.
Tall red draped curtains or colonial architectural details can frame the background while warm light falls across the center figures and table, creating dramatic cinematic depth.
The scene should capture the dramatic historical moment intimately, where the primary signer is standing at the central table presenting or signing the Declaration while a few surrounding founding fathers observe.

Adjust each subject's body pose naturally to fit the exact staging and posture style of the surrounding historical figures while preserving facial identity.
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
- the subject(s) MUST break this flow by facing forward and looking directly at the camera
- the signing figure must remain the visual focal point
- all subjects clearly visible among the founding fathers
- maintain balanced cinematic composition
- no distortion
- no extra fingers
- no malformed anatomy
- no blurry face
- no duplicated people

The final result must look like a real cinematic photograph recreating the exact composition and atmosphere of the iconic Declaration of Independence painting while naturally integrating the subject(s) into the historical moment.`
  }
];