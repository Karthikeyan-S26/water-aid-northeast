// Mock data for the health monitoring system

export interface VillageData {
  id: string;
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  population: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  waterSources: number;
  recentCases: number;
  ashaWorker?: string;
}

export interface HealthReport {
  id: string;
  patientName: string;
  age: number;
  village: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  reportDate: string;
  ashaWorker: string;
  waterSource: string;
}

export interface WaterQualityReport {
  id: string;
  location: string;
  sourceType: string;
  ph?: number;
  turbidity?: number;
  tds?: number;
  temperature?: number;
  chlorine?: number;
  ecoli: 'detected' | 'not_detected' | 'not_tested';
  testDate: string;
  ashaWorker: string;
  coordinates?: [number, number];
}

export interface Alert {
  id: string;
  type: 'outbreak_risk' | 'water_contamination' | 'system_alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  village: string;
  district: string;
  createdAt: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

// Mock villages in Northeast India
export const mockVillages: VillageData[] = [
  {
    id: '1',
    name: 'Majuli Island',
    district: 'Majuli',
    latitude: 26.9584,
    longitude: 94.2075,
    population: 1200,
    riskLevel: 'high',
    waterSources: 3,
    recentCases: 12,
    ashaWorker: 'Sunita Devi'
  },
  {
    id: '2',
    name: 'Jorhat Town',
    district: 'Jorhat',
    latitude: 26.7509,
    longitude: 94.2037,
    population: 2500,
    riskLevel: 'medium',
    waterSources: 5,
    recentCases: 3,
    ashaWorker: 'Priya Sharma'
  },
  {
    id: '3',
    name: 'Dibrugarh Central',
    district: 'Dibrugarh',
    latitude: 27.4728,
    longitude: 94.9120,
    population: 3200,
    riskLevel: 'low',
    waterSources: 8,
    recentCases: 1,
    ashaWorker: 'Meera Gogoi'
  },
  {
    id: '4',
    name: 'Sivasagar Village',
    district: 'Sivasagar',
    latitude: 26.9854,
    longitude: 94.6300,
    population: 1800,
    riskLevel: 'medium',
    waterSources: 4,
    recentCases: 5,
    ashaWorker: 'Rina Borah'
  },
  {
    id: '5',
    name: 'Golaghat Market',
    district: 'Golaghat',
    latitude: 26.5264,
    longitude: 93.9596,
    population: 1500,
    riskLevel: 'low',
    waterSources: 6,
    recentCases: 0,
    ashaWorker: 'Kavita Das'
  }
];

// Mock health reports
export const mockHealthReports: HealthReport[] = [
  {
    id: '1',
    patientName: 'Ramesh Kumar',
    age: 35,
    village: 'Majuli Island',
    symptoms: ['fever', 'diarrhea', 'vomiting'],
    severity: 'severe',
    reportDate: '2024-01-15T14:30:00Z',
    ashaWorker: 'Sunita Devi',
    waterSource: 'River water'
  },
  {
    id: '2',
    patientName: 'Anjali Borah',
    age: 28,
    village: 'Jorhat Town',
    symptoms: ['stomach_pain', 'nausea'],
    severity: 'mild',
    reportDate: '2024-01-15T10:15:00Z',
    ashaWorker: 'Priya Sharma',
    waterSource: 'Village well'
  }
];

// Mock water quality reports
export const mockWaterReports: WaterQualityReport[] = [
  {
    id: '1',
    location: 'Majuli River Point A',
    sourceType: 'river',
    ph: 5.8,
    turbidity: 8.5,
    tds: 850,
    temperature: 28.5,
    chlorine: 0.0,
    ecoli: 'detected',
    testDate: '2024-01-15T09:00:00Z',
    ashaWorker: 'Sunita Devi',
    coordinates: [26.9584, 94.2075]
  },
  {
    id: '2',
    location: 'Jorhat Village Well #1',
    sourceType: 'village_well',
    ph: 7.2,
    turbidity: 2.1,
    tds: 450,
    temperature: 26.0,
    chlorine: 0.3,
    ecoli: 'not_detected',
    testDate: '2024-01-15T08:30:00Z',
    ashaWorker: 'Priya Sharma',
    coordinates: [26.7509, 94.2037]
  }
];

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'outbreak_risk',
    severity: 'critical',
    title: 'Potential Cholera Outbreak',
    description: 'Multiple cases of severe diarrhea and vomiting reported in Majuli Island. Water contamination suspected.',
    village: 'Majuli Island',
    district: 'Majuli',
    createdAt: '2024-01-15T14:45:00Z',
    status: 'active'
  },
  {
    id: '2',
    type: 'water_contamination',
    severity: 'high',
    title: 'E. coli Detected in Water Source',
    description: 'E. coli bacteria detected in main river water source used by community.',
    village: 'Majuli Island',
    district: 'Majuli',
    createdAt: '2024-01-15T09:15:00Z',
    status: 'active'
  },
  {
    id: '3',
    type: 'system_alert',
    severity: 'medium',
    title: 'Water Quality Below Standards',
    description: 'pH levels and turbidity readings indicate poor water quality.',
    village: 'Jorhat Town',
    district: 'Jorhat',
    createdAt: '2024-01-15T11:20:00Z',
    status: 'acknowledged'
  }
];

// Risk calculation function
export const calculateVillageRisk = (village: VillageData): number => {
  const riskScores = {
    low: 0.2,
    medium: 0.5,
    high: 0.8,
    critical: 1.0
  };
  return riskScores[village.riskLevel];
};

// Get villages by risk level
export const getVillagesByRisk = (riskLevel: string) => {
  return mockVillages.filter(village => village.riskLevel === riskLevel);
};

// Get recent reports for a village
export const getReportsForVillage = (villageName: string) => {
  const healthReports = mockHealthReports.filter(report => report.village === villageName);
  const waterReports = mockWaterReports.filter(report => report.location.includes(villageName));
  return { healthReports, waterReports };
};

// Get active alerts
export const getActiveAlerts = () => {
  return mockAlerts.filter(alert => alert.status === 'active');
};