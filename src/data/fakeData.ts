// src/data/fakeData.ts

const generateData = <T>(creator: (index: number) => T, count: number): T[] => {
  return Array.from({ length: count }, (_, i) => creator(i));
};

export type Document = {
  id: number;
  name: string;
  type: string;
  uploaded: string;
  by: string;
};
const docTypes = ['Filing', 'Motion', 'Exhibit', 'Transcript', 'Order', 'Pleading'];
const people = ['J. Doe', 'A. Smith', 'L. Ray', 'M. Chen', 'S. Garcia'];
export const documentsData = generateData<Document>((i) => ({
  id: i,
  name: `Document_File_${i + 1}.pdf`,
  type: docTypes[i % docTypes.length],
  uploaded: `2024-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
  by: people[i % people.length],
}), 1000);

export type HistoryEvent = {
  id: number;
  date: string;
  event: string;
  filedBy: string;
  docket: string;
};
const eventTypes = ['Complaint Filed', 'Summons Issued', 'Appearance Filed', 'Motion Hearing', 'Status Conference', 'Jury Trial Set'];
export const caseHistoryData = generateData<HistoryEvent>((i) => ({
  id: i,
  date: `2023-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 28 + 1).padStart(2, '0')}`,
  event: eventTypes[i % eventTypes.length],
  filedBy: people[i % people.length],
  docket: `D-23-${1000 + i}`,
}), 2000);