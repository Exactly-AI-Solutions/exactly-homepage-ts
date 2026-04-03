'use client';
import styles from './Drawer.module.css';

const DRAWER_ITEMS = [
  { label: 'Quick Wins', sub: 'For Your Business', context: 'quick-wins' },
  { label: 'Deep Dive', sub: 'Reports', context: 'deep-dives' },
  { label: 'CRO Chatbot', sub: 'For My Website', context: 'cro-chatbots' },
  { label: 'The Exactly', sub: 'Difference', context: 'exactly-difference' },
  { label: 'Your AI', sub: 'Roadmap', context: 'ai-roadmap' },
  { label: 'Who We Are', sub: 'Our story & team', context: 'who-we-are' },
  { label: 'How It Works', sub: 'Our process', context: 'how-it-works' },
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
          {DRAWER_ITEMS.map((item) => (
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

          <div className={styles.chatbotCallout}>
            <p>Add a conversion chatbot to your website — built and run by us.</p>
            <a href="#">Try the CRO Chatbot &rarr;</a>
          </div>

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
