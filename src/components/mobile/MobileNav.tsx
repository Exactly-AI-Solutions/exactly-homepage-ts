'use client';
import styles from './MobileNav.module.css';

interface Props {
  isDrawerOpen: boolean;
  onToggle: () => void;
}

export default function MobileNav({ isDrawerOpen, onToggle }: Props) {
  return (
    <nav className={styles.nav}>
      <span className={styles.wordmark}>Exactly</span>
      <button
        className={`${styles.hamburger}${isDrawerOpen ? ' ' + styles.open : ''}`}
        onClick={onToggle}
        aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
