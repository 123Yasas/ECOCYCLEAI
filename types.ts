
export type Role = 'user' | 'seller';
export type Language = 'en' | 'ta';
export type Tool = 'Scissors' | 'Glue' | 'Cutter' | 'Paint' | 'Thread';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerName: string;
  rank?: string;
  // Added optional videoUrl to support product videos and resolve type mismatch in SellerDashboard
  videoUrl?: string;
}

export interface ReuseStep {
  step: number;
  instruction: string;
  visualPrompt: string;
}

export interface ReuseInstruction {
  projectName: string;
  material: string;
  steps: ReuseStep[];
  youtubeSearchQuery: string;
}

export interface ClassificationResult {
  classification: 'Reusable' | 'Non-Reusable' | 'Hazardous';
  reason: string;
  materialName: string;
  impactMessage: string;
  suggestions?: { title: string; description: string }[];
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CompletedProject {
  id: string;
  name: string;
  imageUrl: string;
  date: string;
}
