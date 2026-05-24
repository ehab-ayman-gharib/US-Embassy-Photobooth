export enum AppScreen {
  SPLASH = 'SPLASH',
  ERA_SELECTION = 'ERA_SELECTION',
  CAMERA = 'CAMERA',
  PREVIEW = 'PREVIEW',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
}

export enum EraId {
  GUARDIAN = 'guardian',
  LOTUS = 'lotus',
  SHADOW = 'shadow',
  SILENT = 'silent',
  ASCENDANT = 'ascendant',
}

export interface EraData {
  id: EraId;
  name: string;
  description: string;
  promptInstructions: string;
}


export interface FaceDetectionResult {
  maleCount: number;
  femaleCount: number;
  childCount: number;
  totalPeople: number;
}

export interface Character {
  name: string;
  description: string;
  pose: string;
  attire: string;
}