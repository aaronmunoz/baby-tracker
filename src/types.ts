// Firebase Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  databaseURL?: string;
  measurementId?: string;
}

// Event Types
export interface BaseEvent {
  id: string;
  timestamp: string;
  type: EventType;
  demo?: boolean;
}

export interface FeedEvent extends BaseEvent {
  type: 'feed';
  breast: 'left' | 'right';
  duration?: number;
}

export interface DiaperEvent extends BaseEvent {
  type: 'diaper';
  poop: boolean;
  pee: boolean;
}

export interface SpitUpEvent extends BaseEvent {
  type: 'spit-up';
}

export type EventType = 'feed' | 'diaper' | 'spit-up';
export type BabyEvent = FeedEvent | DiaperEvent | SpitUpEvent;

// App State Types
export interface AppState {
  firebaseApp: any | null;
  database: any | null;
  events: BabyEvent[];
  demoMode: boolean;
  diagnosticsLog: string[];
}

// Test Types
export interface TestResult {
  success: boolean;
  message: string;
  error?: Error;
  data?: any;
}

export interface FirebaseTestSuite {
  configTest: () => Promise<TestResult>;
  initTest: () => Promise<TestResult>;
  connectionTest: () => Promise<TestResult>;
  writeTest: () => Promise<TestResult>;
  readTest: () => Promise<TestResult>;
  cleanupTest: () => Promise<TestResult>;
}

// Diagnostics Types
export interface DiagnosticsInfo {
  firebaseStatus: 'connected' | 'disconnected' | 'error';
  configValid: boolean;
  databaseUrl: string;
  projectId: string;
  authDomain: string;
  localEventCount: number;
  todayEventCount: number;
  demoMode: boolean;
  lastEventTime: string | null;
  localStorageSize: string;
  configSaved: boolean;
}