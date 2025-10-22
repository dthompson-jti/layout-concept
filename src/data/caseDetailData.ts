// src/data/caseDetailData.ts
// This file is the new single source of truth for all dashboard tile content.

// --- TYPE DEFINITIONS ---

export interface ColumnMetadata {
  cardRole?: 'title' | 'subtitle' | 'badge' | 'meta';
}

export interface ColumnSchema {
  key: string;
  label: string;
  meta?: ColumnMetadata;
}

export type TableRow = Record<string, string | number | boolean | null>;

export interface Table {
  title: string;
  columns: ColumnSchema[];
  visible_rows: TableRow[];
  totals?: Record<string, string>;
}

export interface MenuAction {
  label: string;
  submenu?: boolean;
}

export interface CaseEntry {
  page: {
    title: string;
    tables_count: number;
    tables: Table[];
  };
  menu: {
    title: string;
    actions: (string | MenuAction)[];
  };
}

export interface CaseDetails {
  case: {
    title: string;
  };
  entries: CaseEntry[];
}

// --- DATA ADAPTER & OPTIMIZATION ---

const processData = (data: CaseDetails): Map<string, CaseEntry> => {
  const entryMap = new Map<string, CaseEntry>();
  data.entries.forEach(entry => {
    const key = entry.menu.title.replace(' (menu)', '').toLowerCase();
    entryMap.set(key, entry);
  });
  return entryMap;
};


// --- RAW JSON DATA ---
// FIX: Added more data to several tables to better simulate a real-world scenario.
const rawData: CaseDetails = {
  "case": {
    "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY"
  },
  "entries": [
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 3,
        "tables": [
          {
            "title": "TIME STANDARDS / CLOCKS",
            "columns": [
              { "key": "Expires", "label": "Expires" },
              { "key": "Status", "label": "Status", "meta": { "cardRole": "badge" } },
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Record", "label": "Record" },
              { "key": "Category", "label": "Category" },
              { "key": "Start", "label": "Start" },
              { "key": "End", "label": "End" }
            ],
            "visible_rows": [
              { "Expires": "06/17/2025", "Status": "Expired", "Name": "Play Plan Insert Test", "Record": "Case", "Category": "", "Start": "06/10/2025", "End": "06/18/2025" },
              { "Expires": "07/22/2025", "Status": "Active", "Name": "Discovery Cutoff", "Record": "Case", "Category": "Civil", "Start": "01/21/2025", "End": "07/22/2025" },
              { "Expires": "08/15/2025", "Status": "Pending", "Name": "Statute of Limitations", "Record": "Case", "Category": "General", "Start": "08/15/2023", "End": "08/15/2025" },
              { "Expires": "09/01/2025", "Status": "Active", "Name": "Case Management Conference", "Record": "Event", "Category": "Civil", "Start": "09/01/2025", "End": "09/01/2025" },
              { "Expires": "11/10/2025", "Status": "Tolled", "Name": "Service of Process", "Record": "Party", "Category": "Procedural", "Start": "01/21/2025", "End": "11/10/2025" },
              { "Expires": "12/31/2025", "Status": "Active", "Name": "Expert Witness Disclosure", "Record": "Case", "Category": "Civil", "Start": "06/01/2025", "End": "12/31/2025" },
              { "Expires": "01/15/2026", "Status": "Pending", "Name": "Motion to Compel Deadline", "Record": "Motion", "Category": "Discovery", "Start": "12/15/2025", "End": "01/15/2026" },
              { "Expires": "03/01/2026", "Status": "Active", "Name": "Final Status Conference", "Record": "Event", "Category": "Trial", "Start": "03/01/2026", "End": "03/01/2026" },
              { "Expires": "04/20/2026", "Status": "Expired", "Name": "ADR Completion Deadline", "Record": "Case", "Category": "ADR", "Start": "10/20/2025", "End": "04/20/2026" },
              { "Expires": "05/19/2026", "Status": "Active", "Name": "Trial Readiness Review", "Record": "Case", "Category": "Trial", "Start": "05/19/2026", "End": "05/19/2026" }
            ]
          },
          {
            "title": "CASE ASSIGNMENTS",
            "columns": [
              { "key": "Effective Date", "label": "Effective Date" },
              { "key": "Courthouse", "label": "Courthouse", "meta": { "cardRole": "title" } },
              { "key": "Department", "label": "Department", "meta": { "cardRole": "subtitle" } },
              { "key": "Judge", "label": "Judge" },
              { "key": "Reason", "label": "Reason" },
              { "key": "End Date", "label": "End Date" }
            ],
            "visible_rows": [ { "Effective Date": "01/21/2025", "Courthouse": "Stanley Mosk Courthouse", "Department": "Department 94", "Judge": "Jon R. Takasugi", "Reason": "Initial Assignment", "End Date": "" } ]
          },
          {
            "title": "FUTURE HEARINGS",
            "columns": [
              { "key": "Type", "label": "Type", "meta": { "cardRole": "title" } },
              { "key": "Date/Time", "label": "Date/Time", "meta": { "cardRole": "subtitle" } },
              { "key": "Department", "label": "Department" },
              { "key": "Status", "label": "Status", "meta": { "cardRole": "badge" } },
              { "key": "Result", "label": "Result" }
            ],
            "visible_rows": [
              { "Type": "Non-Jury Trial", "Date/Time": "07/21/2026 08:30 AM", "Department": "Dept 94 / Stanley Mosk", "Status": "Scheduled", "Result": "" },
              { "Type": "Order to Show Cause Re: Failure to File Proof of Service", "Date/Time": "01/25/2028 08:30 AM", "Department": "Dept 94 / Stanley Mosk", "Status": "Scheduled", "Result": "" }
            ]
          }
        ]
      },
      "menu": { "title": "Case (menu)", "actions": [ "Register of Actions", "Assign Case", "Reassign / Reclassify Case", "Case Special Status", "File Tracking", "Seal Case", "Transfer Case", "Update Caption / Number / Type of Action", "Relate Cases", "Unrelate Case", "Consolidate Cases", "Unconsolidate Case", "Bifurcate Case", "Remove Legacy Consolidation Joinder", "Case Audit", "Workflow Audit", "Add Lien / Levy", "Add Case Note", "Interface Tracking", "Audited Email", "QA" ] }
    },
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 1,
        "tables": [
          {
            "title": "SUBCASES",
            "columns": [
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Party Type", "label": "Party Type", "meta": { "cardRole": "subtitle" } },
              { "key": "Represented By", "label": "Represented By" }
            ],
            "visible_rows": [
              { "Name": "Complaint filed by Hannah Seth on 01/21/2025", "Party Type": "", "Represented By": "" },
              { "Name": "Hannah Seth (Plaintiff)", "Party Type": "Plaintiff", "Represented By": "Kayson King" },
              { "Name": "Eileen Bradley (Defendant)", "Party Type": "Defendant", "Represented By": "" }
            ]
          }
        ]
      },
      "menu": { "title": "Subcase (menu)", "actions": [ "Add Amended Complaint / Amended Cross-Complaint" ] }
    },
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 1,
        "tables": [
          {
            "title": "DOCUMENTS",
            "columns": [
              { "key": "Filed / Status Date", "label": "Filed / Status Date" },
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Status", "label": "Status", "meta": { "cardRole": "badge" } },
              { "key": "Result", "label": "Result" },
              { "key": "Result Date", "label": "Result Date" },
              { "key": "Filed By", "label": "Filed By", "meta": { "cardRole": "subtitle" } },
              { "key": "As To", "label": "As To" },
              { "key": "View", "label": "View" }
            ],
            "visible_rows": [
              { "Filed / Status Date": "01/21/2025", "Name": "First Amended Standing Order", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Court", "As To": "All Parties", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Notice of Case Assignment - Limited Civil Case", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Court", "As To": "All Parties", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Summons on Complaint(s)", "Status": "Issued and Filed", "Result": "", "Result Date": "", "Filed By": "Clerk", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Civil Case Cover Sheet", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Complaint", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "Eileen Bradley (Defendant)", "View": "icons" },
              { "Filed / Status Date": "02/15/2025", "Name": "Proof of Service of Summons", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "Eileen Bradley (Defendant)", "View": "icons" },
              { "Filed / Status Date": "03/10/2025", "Name": "Answer to Complaint", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Eileen Bradley (Defendant)", "As To": "", "View": "icons" },
              { "Filed / Status Date": "04/01/2025", "Name": "Notice of Deposition", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "Eileen Bradley (Defendant)", "View": "icons" },
              { "Filed / Status Date": "04/20/2025", "Name": "Motion to Compel Discovery", "Status": "Received", "Result": "Granted", "Result Date": "05/05/2025", "Filed By": "Hannah Seth (Plaintiff)", "As To": "Eileen Bradley (Defendant)", "View": "icons" },
              { "Filed / Status Date": "05/10/2025", "Name": "Stipulation and Protective Order", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "All Parties", "As To": "", "View": "icons" },
              { "Filed / Status Date": "06/01/2025", "Name": "First Set of Interrogatories", "Status": "Served", "Result": "", "Result Date": "", "Filed By": "Eileen Bradley (Defendant)", "As To": "Hannah Seth (Plaintiff)", "View": "icons" }
            ]
          }
        ]
      },
      "menu": { "title": "Docs (menu)", "actions": [ "Add Document", "Generate Form / Notice", "Documents Waiting For Scan", "Legacy Images", "Drive", "Doc Viewer", "Document Organizer", "Bulk Print", "Merge Documents", "Bates Stamp", "Box", "Add Document Tracking", "Generate Document Packet", "Generate Test Docs", "Generate 500 Test Docs", "QA Tests", "EDocument File Upload", "Add Document to Multiple Cases" ] }
    },
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 3,
        "tables": [
          {
            "title": "FUTURE HEARINGS",
            "columns": [
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Date/Time", "label": "Date/Time", "meta": { "cardRole": "subtitle" } },
              { "key": "Status", "label": "Status", "meta": { "cardRole": "badge" } },
              { "key": "Department", "label": "Department" },
              { "key": "Document", "label": "Document" },
              { "key": "Ex Parte", "label": "Ex Parte" },
              { "key": "Result", "label": "Result" }
            ],
            "visible_rows": [
              { "Name": "Non-Jury Trial", "Date/Time": "07/21/2026 08:30 AM", "Status": "Scheduled", "Department": "Dept 94 / Stanley Mosk", "Document": "No", "Ex Parte": "", "Result": "" },
              { "Name": "Order to Show Cause Re: Failure to File Proof of Service", "Date/Time": "01/25/2028 08:30 AM", "Status": "Scheduled", "Department": "Dept 94 / Stanley Mosk", "Document": "No", "Ex Parte": "", "Result": "" }
            ]
          },
          { "title": "NON CALENDARED HEARINGS", "columns": [ { "key": "Name", "label": "Name" } ], "visible_rows": [ { "Name": "No records found." } ] },
          { "title": "ALL HEARINGS", "columns": [], "visible_rows": [] }
        ]
      },
      "menu": { "title": "Hearings (menu)", "actions": [ { "label": "Add Hearing" }, { "label": "Add Hearing Slots Only" }, { "label": "CRS Hearings" }, { "label": "Proceedings / Minutes", "submenu": true }, { "label": "Schedule Event by SubCase" } ] }
    },
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 2,
        "tables": [
          {
            "title": "PARTIES",
            "columns": [
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Party-Type", "label": "Party-Type", "meta": { "cardRole": "subtitle" } },
              { "key": "Fee Status", "label": "Fee Status", "meta": { "cardRole": "badge" } },
              { "key": "Party Status", "label": "Party Status" },
              { "key": "Representation", "label": "Representation" }
            ],
            "visible_rows": [
              { "Name": "Complaint filed by Hannah Seth on 01/21/2025", "Party-Type": "", "Fee Status": "", "Party Status": "Active", "Representation": "" },
              { "Name": "Hannah Seth (Plaintiff)", "Party-Type": "Plaintiff", "Fee Status": "Paid", "Party Status": "Active", "Representation": "Kayson King" },
              { "Name": "Eileen Bradley (Defendant)", "Party-Type": "Defendant", "Fee Status": "Due", "Party Status": "Named", "Representation": "Pro Se" },
              { "Name": "ACME Corporation (Cross-Defendant)", "Party-Type": "Cross-Defendant", "Fee Status": "Waived", "Party Status": "Active", "Representation": "Law Firm of Dewey, Cheatem & Howe" },
              { "Name": "John Doe (Witness)", "Party-Type": "Witness", "Fee Status": "N/A", "Party Status": "Subpoenaed", "Representation": "" },
              { "Name": "Jane Smith (Expert Witness)", "Party-Type": "Expert Witness", "Fee Status": "N/A", "Party Status": "Retained", "Representation": "" },
              { "Name": "Big Insurance Co. (Intervener)", "Party-Type": "Intervener", "Fee Status": "Paid", "Party Status": "Active", "Representation": "Global Legal LLP" }
            ]
          },
          {
            "title": "REPRESENTATION",
            "columns": [
              { "key": "Name", "label": "Name", "meta": { "cardRole": "title" } },
              { "key": "Firm Name", "label": "Firm Name" },
              { "key": "Representing Party", "label": "Representing Party", "meta": { "cardRole": "subtitle" } },
              { "key": "Formerly Representing", "label": "Formerly Representing" },
              { "key": "Subcase Name", "label": "Subcase Name" }
            ],
            "visible_rows": [
              { "Name": "Kayson King", "Firm Name": "King & Associates", "Representing Party": "Hannah Seth (Plaintiff)", "Formerly Representing": "", "Subcase Name": "Complaint filed by Hannah Seth on 01/21/2025" },
              { "Name": "Eleanor Vance", "Firm Name": "Law Firm of Dewey, Cheatem & Howe", "Representing Party": "ACME Corporation (Cross-Defendant)", "Formerly Representing": "", "Subcase Name": "Cross-Complaint" },
              { "Name": "Marcus Thorne", "Firm Name": "Global Legal LLP", "Representing Party": "Big Insurance Co. (Intervener)", "Formerly Representing": "", "Subcase Name": "Complaint in Intervention" }
            ]
          }
        ]
      },
      "menu": { "title": "Parties (menu)", "actions": [ "Add Party", "Add Parties from Excel File", "Add Attorney", "First Appearance Summary", "Party Names", "Party Addresses", "Add Bail/Bond", "Dispose Summary", "Remaining - Defendants", "Remaining - Plaintiffs", "Add Restitution" ] }
    },
    {
      "page": {
        "title": "25STLC00161 HANNAH SETH vs EILEEN BRADLEY",
        "tables_count": 3,
        "tables": [
          {
            "title": "Fines & Fees",
            "columns": [
              { "key": "Date", "label": "Date" },
              { "key": "Fine/Fee", "label": "Fine/Fee", "meta": { "cardRole": "title" } },
              { "key": "Party/Payor", "label": "Party/Payor", "meta": { "cardRole": "subtitle" } },
              { "key": "Balance", "label": "Balance", "meta": { "cardRole": "badge" } },
              { "key": "Amount", "label": "Amount" },
              { "key": "Paid", "label": "Paid" }
            ],
            "visible_rows": [
              { "Date": "01/21/2025", "Fine/Fee": "160 — Limited Civil Complaint", "Party/Payor": "Hannah Seth", "Balance": "0.00", "Amount": "370.00", "Paid": "370.00" },
              { "Date": "06/10/2025", "Fine/Fee": "PROB — Probation Fee", "Party/Payor": "Hannah Seth", "Balance": "100.00", "Amount": "100.00", "Paid": "0.00" },
              { "Date": "06/10/2025", "Fine/Fee": "TST — Test Fee", "Party/Payor": "Eileen Bradley", "Balance": "200.00", "Amount": "200.00", "Paid": "0.00" },
              { "Date": "07/01/2025", "Fine/Fee": "Motion Fee", "Party/Payor": "Hannah Seth", "Balance": "0.00", "Amount": "60.00", "Paid": "60.00" },
              { "Date": "07/15/2025", "Fine/Fee": "Sanctions", "Party/Payor": "Eileen Bradley", "Balance": "250.00", "Amount": "250.00", "Paid": "0.00" },
              { "Date": "08/01/2025", "Fine/Fee": "Jury Fees - First Day", "Party/Payor": "Hannah Seth", "Balance": "0.00", "Amount": "150.00", "Paid": "150.00" },
              { "Date": "08/20/2025", "Fine/Fee": "Copying Fees", "Party/Payor": "Eileen Bradley", "Balance": "15.50", "Amount": "15.50", "Paid": "0.00" },
              { "Date": "09/05/2025", "Fine/Fee": "Continuance Fee", "Party/Payor": "Hannah Seth", "Balance": "0.00", "Amount": "20.00", "Paid": "20.00" }
            ],
            "totals": { "Amount": "1215.50", "Paid": "600.00", "Balance": "615.50" }
          },
          { "title": "Pay Plans", "columns": [ { "key": "Pay Plan", "label": "Pay Plan", "meta": { "cardRole": "title" } } ], "visible_rows": [ { "Pay Plan": "Pay Plan No. PP73-1 starts on 06/10/2025" } ] },
          { "title": "Party Trusts", "columns": [ { "key": "Account Name", "label": "Account Name", "meta": { "cardRole": "title" } } ], "visible_rows": [ { "Account Name": "Cash Bond" } ] }
        ]
      },
      "menu": { "title": "Financial (menu)", "actions": [ "Add FEE Document", "Add Cross Complaint", "Add Fee w/o Payment", "Add FEE Document to Multiple Cases", "Add Notice of Appeal", "Waived Fees Summary", "Cash Receipts", "Request Refund", "Case Ledger Table", "Collections", "Financial Widgets" ] }
    }
  ]
};

// The processed and exported data map for use throughout the application.
export const caseDetailDataMap = processData(rawData);