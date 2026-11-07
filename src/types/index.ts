export type AppTab = 'home' | 'modules' | 'consultation' | 'guides' | 'profile';

export type UserRole = 'visitor' | 'biomedical_engineer' | 'nurse' | 'radiologist' | 'hospital_admin';

export type PillarId = 'radiation' | 'electrical' | 'green_hospital' | 'healthcare_engineering';

export interface EducationalModule {
  id: string;
  pillar: PillarId;
  title: string;
  subtitle: string;
  readTime: string;
  targetAudience: string;
  standard: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
    warningNote?: string;
    safeThreshold?: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  downloadableTitle: string;
}

export interface PocketGuide {
  id: string;
  pillar: PillarId;
  title: string;
  arabicCode: string;
  pagesCount: number;
  updatedDate: string;
  description: string;
  keyTakeaways: string[];
  protocolSteps: {
    stepNumber: number;
    title: string;
    action: string;
    criticalCheck: string;
  }[];
  standardsReference: string[];
  pdfSummary: string;
}

export interface ConsultationMessage {
  id: string;
  sender: 'user' | 'specialist';
  text: string;
  timestamp: string;
  specialistRole?: string;
  tags?: string[];
  recommendations?: string[];
}

export interface BookedConsultation {
  id: string;
  visitorName: string;
  hospitalDepartment: string;
  topic: string;
  pillar: PillarId;
  date: string;
  timeSlot: string;
  urgency: 'routine' | 'urgent' | 'critical';
  notes: string;
  status: 'confirmed' | 'pending' | 'completed';
}

export interface GreenHospitalAudit {
  energyScore: number;
  wasteScore: number;
  waterScore: number;
  procurementScore: number;
  buildingScore: number;
}
