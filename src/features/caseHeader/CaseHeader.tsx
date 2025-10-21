// src/features/caseHeader/CaseHeader.tsx
import React from 'react';
import { CaseData } from '../../data/caseData';
import { Badge } from '../../components/Badge';
import { Tooltip } from '../../components/Tooltip';
import { InfoBlock } from './InfoBlock';
import { Tag } from './Tag';
import styles from './CaseHeader.module.css';

interface CaseHeaderProps {
  data: CaseData;
}

const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
};

// New: Define a sort order for tags
const tagSortOrder = { mobile: 1, tablet: 2, desktop: 3 };

export const CaseHeader: React.FC<CaseHeaderProps> = ({ data }) => {
  const responsiveTags = data.tags.filter(tag => tag.visibility !== 'desktop');
  
  // New: Create a sorted list of all tags for the desktop view
  const allTagsSorted = [...data.tags].sort((a, b) => tagSortOrder[a.visibility] - tagSortOrder[b.visibility]);

  return (
    <div className={styles.headerContainer}>
        {/* Row 1: Core ID, Title, and Actions */}
        <div className={styles.row1}>
          <div className={styles.statusBadges}>
            <Badge variant="success" showStatusDot>{data.status}</Badge>
            {data.isSealed && <Badge variant="error">Case Sealed</Badge>}
            
            {/* CHANGE: Wrap responsive tags in a dedicated container for CSS targeting */}
            <div className={styles.responsiveTagsWrapper}>
              {responsiveTags.length > 0 && <div className={styles.badgeSeparator} />}
              {responsiveTags.map((tag, index) => (
                <Tag key={`${tag.label}-responsive-${index}`} {...tag} inverted />
              ))}
            </div>
          </div>

          <div className={styles.titleGroup}>
            <div className={styles.caseIdentifiers}>
              <span className={styles.caseNumber}>{data.caseNumber}</span>
              <Tooltip content={data.caseName}>
                <h1 className={styles.caseName}>{data.caseName}</h1>
              </Tooltip>
            </div>
          </div>

          <div className={styles.actionsGroup}>
            {data.amountDueCents && (
              <button className="btn btn-secondary">
                Amount Due: {formatCurrency(data.amountDueCents)}
              </button>
            )}
            <div className={styles.iconActions}>
              <Tooltip content="Bookmark"><button className="btn btn-tertiary icon-only"><span className="material-symbols-rounded">bookmark</span></button></Tooltip>
              <Tooltip content="Add Note"><button className="btn btn-tertiary icon-only"><span className="material-symbols-rounded">add_notes</span></button></Tooltip>
              <Tooltip content="Email"><button className="btn btn-tertiary icon-only"><span className="material-symbols-rounded">mail</span></button></Tooltip>
              <Tooltip content="Copy"><button className="btn btn-tertiary icon-only"><span className="material-symbols-rounded">content_copy</span></button></Tooltip>
            </div>
          </div>
        </div>

        {/* Row 2: Secondary Info */}
        <div className={styles.row2}>
          <InfoBlock icon="gavel" label="Case Type">
            {data.caseType}
          </InfoBlock>
          <InfoBlock icon="schedule" label="Filed Date">
            {new Date(data.filedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {data.filedDateRelative}
          </InfoBlock>
          <InfoBlock icon="location_on" label="Courthouse">
            {data.courthouse.name}: {data.courthouse.department}
          </InfoBlock>
        </div>

        {/* Row 3: Tertiary Info */}
        <div className={styles.row3}>
          <InfoBlock label="Presiding Officer">
            <span>{data.presidingOfficer}</span>
          </InfoBlock>
          {data.nextHearing && (
            <InfoBlock label="Next Hearing">
              <span>
                {new Date(data.nextHearing.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {data.nextHearing.time}
              </span>
              <br/>
              <span>{data.nextHearing.type}</span>
            </InfoBlock>
          )}
          {data.testColumns.map((col, index) => (
              <InfoBlock key={index} label={col.title}>
                  <span>{col.text}</span>
              </InfoBlock>
          ))}
        </div>

        {/* CHANGE: This row now renders ALL sorted tags and will be shown only on desktop */}
        <div className={styles.tagsRow}>
          {allTagsSorted.map((tag, index) => (
            <Tag key={`${tag.label}-desktop-${index}`} {...tag} inverted={false} />
          ))}
        </div>
    </div>
  );
};