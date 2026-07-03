export interface Job {
  title: string;
  company: string;
  dates: string;
  duration: string;
  isDesign: boolean;
  description: string;
  tech: string[];
  logoUrl?: string;
  logoScale?: number;
  logoOffsetY?: number;
  projectImageUrl?: string;
  projectImages?: string[];
  projectTitle?: string;
  num?: string;
  initial?: string;
  slotId?: string;
}
