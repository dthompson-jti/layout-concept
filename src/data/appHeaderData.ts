// src/data/appHeaderData.ts

export interface User {
  name: string;
}

export interface CaseInfo {
  id: string;
  name: string;
  department: string;
}

export interface Language {
  value: string;
  label: string;
}

export const mockUser: User = {
  // FIX: Updated user name as requested.
  name: 'Stanley Mosk',
};

export const mockCaseList: CaseInfo[] = [
  { id: '25STLC00161', name: 'Smith vs. Anderson', department: 'Department 1A' },
  { id: '24TRBC003452', name: 'Jones Construction vs. City', department: 'Department 3C' },
  { id: '25CVPI009876', name: 'Rodriguez vs. Statewide Insurance', department: 'Department 2B' },
];

export const mockLanguages: Language[] = [
    { value: 'en', label: 'En (AU)' },
    { value: 'es', label: 'Es (MX)' },
];