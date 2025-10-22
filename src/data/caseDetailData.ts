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

// FIX: Corrected the type for visible_rows to avoid `no-explicit-any`.
// It's a record where values can be of various primitive types.
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

// This function transforms the raw data into a more performant and usable structure.
// Using a Map provides O(1) lookup time for tile data, which is more efficient than Array.find().
const processData = (data: CaseDetails): Map<string, CaseEntry> => {
  const entryMap = new Map<string, CaseEntry>();
  data.entries.forEach(entry => {
    // Sanitize the menu title to use as a stable, simple key.
    const key = entry.menu.title.replace(' (menu)', '').toLowerCase();
    entryMap.set(key, entry);
  });
  return entryMap;
};


// --- RAW JSON DATA ---
// In a real application, this would be fetched from an API.
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
            "visible_rows": [ { "Expires": "06/17/2025", "Status": "Expired", "Name": "Play Plan Insert Test", "Record": "Case", "Category": "", "Start": "06/10/2025", "End": "06/18/2025" } ]
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
            "visible_rows": [ { "Effective Date": "01/21/2025", "Courthouse": "Stanley Mosk Courthouse", "Department": "Department 94", "Judge": "Jon R. Takasugi", "Reason": "", "End Date": "" } ]
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
              { "Filed / Status Date": "01/21/2025", "Name": "First Amended Standing Order", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Notice of Case Assignment - Limited Civil Case", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Summons on Complaint(s)", "Status": "Issued and Filed", "Result": "", "Result Date": "", "Filed By": "Clerk", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Civil Case Cover Sheet", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "", "View": "icons" },
              { "Filed / Status Date": "01/21/2025", "Name": "Complaint", "Status": "Filed", "Result": "", "Result Date": "", "Filed By": "Hannah Seth (Plaintiff)", "As To": "Eileen Bradley (Defendant)", "View": "icons" }
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
              { "Name": "Complaint filed by Hannah Seth on 01/21/2025", "Party-Type": "", "Fee Status": "", "Party Status": "", "Representation": "" },
              { "Name": "Hannah Seth (Plaintiff)", "Party-Type": "Plaintiff", "Fee Status": "Paid", "Party Status": "", "Representation": "Kayson King" },
              { "Name": "Eileen Bradley (Defendant)", "Party-Type": "Defendant", "Fee Status": "", "Party Status": "Named", "Representation": "" }
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
            "visible_rows": [ { "Name": "Kayson King", "Firm Name": "", "Representing Party": "Hannah Seth (Plaintiff)", "Formerly Representing": "", "Subcase Name": "Complaint filed by Hannah Seth on 01/21/2025" } ]
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
              { "Date": "01/21/2025", "Fine/Fee": "160 — Limited Civil Complaint - ($10K up to $25K)-GC 70613(a), 70602.5", "Party/Payor": "Hannah Seth", "Balance": "0.00", "Amount": "370.00", "Paid": "370.00" },
              { "Date": "06/10/2025", "Fine/Fee": "PROB — Probation Fee", "Party/Payor": "Hannah Seth", "Balance": "100.00", "Amount": "100.00", "Paid": "0.00" },
              { "Date": "06/10/2025", "Fine/Fee": "TST — Test Fee", "Party/Payor": "Eileen Bradley", "Balance": "200.00", "Amount": "200.00", "Paid": "0.00" }
            ],
            "totals": { "Amount": "670.00", "Paid": "370.00", "Balance": "300.00" }
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