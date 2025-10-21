// src/data/caseData.ts

export interface CaseTag {
  label: string;
  visibility: 'mobile' | 'tablet' | 'desktop';
  color: 'orange' | 'blue' | 'gray';
}

export interface CaseData {
  caseNumber: string;
  caseName: string;
  status: 'Open';
  isSealed: boolean;
  amountDueCents?: number;
  
  caseType: string;
  filedDate: string; // ISO string
  filedDateRelative: string;
  courthouse: {
    name: string;
    department: string;
  };

  presidingOfficer: string;
  nextHearing?: {
    date: string; // ISO string
    time: string;
    type: string;
  };
  
  // Example for desktop view with placeholder columns
  testColumns: {
      title: string;
      text: string;
  }[];

  tags: CaseTag[];
}

export const mockCaseData: CaseData = {
  caseNumber: 'MAG-CI-24000054',
  caseName: 'TestTitleName vs VeryLongTestTitleNameTestTitleName',
  status: 'Open',
  isSealed: true,
  amountDueCents: 43500,

  caseType: 'Civil Limited: Unlawful Detainer',
  filedDate: '2025-07-12T12:00:00.000Z',
  filedDateRelative: '64 days ago',
  courthouse: {
    name: 'Corona Courthouse',
    department: 'Corona Department C1',
  },

  presidingOfficer: 'Tom Jerry',
  nextHearing: {
    date: '2025-08-10T10:00:00.000Z',
    time: '10:00 AM',
    type: 'Preliminary Hearing',
  },
  
  testColumns: [
    {
      title: 'TestColumn',
      text: 'This is text under the column. This column has longer text to show how the header scales in height.',
    },
    {
      title: 'TestColumn',
      text: 'This is text under the column'
    }
  ],

  tags: [
    { label: 'Confidential Party', visibility: 'mobile', color: 'orange' },
    { label: 'Test', visibility: 'tablet', color: 'blue' },
    { label: 'LongerAlertTest', visibility: 'desktop', color: 'gray' },
    { label: 'LongerAlertTest', visibility: 'desktop', color: 'gray' },
  ],
};