'use client';
import styles from './Drawer.module.css';

const EXPLORE_ITEMS = [
  { label: 'Quick Wins', sub: 'For Your Business', context: 'quick-wins' },
  { label: 'Deep Dive', sub: 'Reports', context: 'deep-dives' },
  { label: 'CRO Chatbot', sub: 'For My Website', context: 'cro-chatbots' },
  { label: 'The Exactly Difference', sub: 'Done-for-you outcomes', context: 'exactly-difference' },
  { label: 'Your AI Roadmap', sub: 'Book an AI Consultation', context: 'ai-roadmap' },
];

const ABOUT_ITEMS = [
  { label: 'Who We Are', sub: 'AI solutions built for SMBs', context: 'who-we-are' },
  { label: 'How It Works', sub: 'Done-for-you, guaranteed outcomes', context: 'how-it-works' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (label: string, context: string) => void;
}

export default function Drawer({ isOpen, onClose, onItemClick }: Props) {
  return (
    <>
      <div
        className={`${styles.overlay}${isOpen ? ' ' + styles.open : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.drawer}${isOpen ? ' ' + styles.open : ''}`}>
        <div className={styles.header}>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <div className={styles.scroll}>
          <p className={styles.sectionLabel}>Explore</p>
          {EXPLORE_ITEMS.map((item) => (
            <button
              key={item.context}
              className={styles.item}
              onClick={() => {
                onClose();
                onItemClick(`${item.label} ${item.sub}`, item.context);
              }}
            >
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemSub}>{item.sub}</span>
            </button>
          ))}

          <hr className={styles.divider} />
          <p className={styles.sectionLabel}>About</p>

          {ABOUT_ITEMS.map((item) => (
            <button
              key={item.context}
              className={styles.item}
              onClick={() => {
                onClose();
                onItemClick(`${item.label} ${item.sub}`, item.context);
              }}
            >
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemSub}>{item.sub}</span>
            </button>
          ))}

          <div className={styles.footerArea}>
            <div className={styles.footerLegal}>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
            <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Exactly AI</p>
          </div>
        </div>
      </div>
    </>
  );
}
