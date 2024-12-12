// src/types/index.ts
export interface User {
    id: number;
    email: string;
    isActive: boolean;
  }
  
  export interface Intent {
    id: string;
    name: string;
    trainingPhrases: string[];
    responses: string[];
    parameters: IntentParameter[];
  }
  
  export interface IntentParameter {
    name: string;
    entityType: string;
    required: boolean;
  }