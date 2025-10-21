// src/data/caseData.ts

// FIX: Define and export the TagData type.
export interface TagData {
  label: string;
  visibility: 'mobile' | 'tablet' | 'desktop';
  color: 'orange' | 'blue' | 'gray';
}

// FIX: Define and export the main CaseData type.
export interface CaseData {
  caseNumber: string;
  caseName: string;
  status: string;
  isSealed: boolean;
  amountDueCents: number | null;
  caseType: string;
  filedDate: string;
  filedDateRelative: string;
  courthouse: {
    name: string;
    department: string;
  };
  presidingOfficer: string;
  nextHearing: {
    date: string;
    time: string;
    type: string;
  } | null;
  tags: TagData[];
  testColumns: { title: string; text: string }[];
}


// This is the mock data for the case header.
export const mockCaseData: CaseData = {
  caseNumber: 'MAG-CI-24000054',
  caseName: 'TestTitleName vs VeryLongTestTitleNameTestTitleName',
  status: 'Open',
  isSealed: true,
  amountDueCents: 43500,
  caseType: 'Civil Limited: Unlawful Detainer',
  filedDate: '2025-07-12',
  filedDateRelative: '64 days ago',
  courthouse: {
    name: 'Corona Courthouse',
    department: 'Corona Department C1',
  },
  presidingOfficer: 'Tom Jerry',
  nextHearing: {
    date: '2025-08-10',
    time: '10:00 AM',
    type: 'Preliminary Hearing',
  },
  tags: [
    { label: 'Confidential', visibility: 'mobile', color: 'orange' },
    { label: 'Test', visibility: 'tablet', color: 'blue' },
    { label: 'LongerAlertTest', visibility: 'desktop', color: 'gray' },
    { label: 'LongerAlertTest', visibility: 'desktop', color: 'gray' },
  ],
  testColumns: [
    {
      title: 'TestColumn',
      text: 'This is text under the column. This column has longer text to show how the header scales in height.',
    },
    {
      title: 'TestColumn',
      text: 'This is text under the column',
    },
  ],
};