'use client';
import LogoWordmark from '@/components/shared/LogoWordmark';
import styles from './TopNav.module.css';

const NAV_ITEMS = [
  { line1: 'Quick Wins', line2: 'For Your Business', context: 'quick-wins', sub: 'See your top AI opportunities' },
  { line1: 'Deep Dive', line2: 'Reports', context: 'deep-dives', sub: 'Full AI audit of your business' },
  { line1: 'CRO Chatbot', line2: 'For My Website', context: 'cro-chatbots', sub: 'Add a conversion chatbot' },
  { line1: 'The Exactly', line2: 'Difference', context: 'exactly-difference', sub: 'Why we\'re different' },
];

interface Props {
  activeContext?: string | null;
  onNavClick?: (label: string, context: string) => void;
}

export default function TopNav({ activeContext, onNavClick }: Props) {
  return (
    <nav className={styles.topnav}>
      <div className={styles.logo}>
        <LogoWordmark height={38} className={styles.logoSvg} />
      </div>
      <div className={styles.items}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.context}
            className={`${styles.item}${activeContext === item.context ? ' ' + styles.active : ''}`}
            onClick={() => onNavClick?.(`${item.line1} ${item.line2}`, item.context)}
          >
            <span className={styles.line1}>{item.line1}</span>
            <span className={styles.line2}>{item.line2}</span>
            <span className={styles.sub}>{item.sub}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
