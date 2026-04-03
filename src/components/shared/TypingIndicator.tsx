import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.typing}>
      <div className={styles.avatar}>E</div>
      <div className={styles.bubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
