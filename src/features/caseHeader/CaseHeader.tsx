// src/features/caseHeader/CaseHeader.tsx
import React from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
// FIX: Removed the unused 'CaseTag as CaseTagType' alias.
import { CaseData } from '../../data/caseData';
import { Badge } from '../../components/Badge';
import { Tooltip } from '../../components/Tooltip';
import { InfoBlock } from './InfoBlock';
import { Tag } from './Tag';
import styles from './CaseHeader.module.css';
import { headerVisibilityAtom } from '../caseDashboard/dashboardState';


interface CaseHeaderProps {
  data: CaseData;
}

const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
};

export const CaseHeader: React.FC<CaseHeaderProps> = ({ data }) => {
  const isHeaderVisible = useAtomValue(headerVisibilityAtom);

  const allTags = data.tags;
  const hasVisibleResponsiveTags = allTags.some(tag => tag.visibility !== 'desktop');

  const headerVariants = {
    visible: { y: 0 },
    hidden: { y: '-100%' },
  };

  return (
    <motion.div
      className={styles.headerContainer}
      variants={headerVariants}
      animate={isHeaderVisible ? 'visible' : 'hidden'}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Row 1: Core ID, Title, and Actions */}
      <div className={styles.row1}>
        <div className={styles.statusBadges}>
          <Badge variant="success" showStatusDot>{data.status}</Badge>
          {data.isSealed && <Badge variant="error">Case Sealed</Badge>}
          
          {hasVisibleResponsiveTags && <div className={styles.badgeSeparator} />}

          {allTags.map(tag => (
            <Tag key={`${tag.label}-${tag.visibility}`} {...tag} inverted={tag.visibility !== 'desktop'} />
          ))}
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
    </motion.div>
  );
};