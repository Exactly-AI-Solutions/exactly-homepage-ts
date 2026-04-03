import ReactMarkdown from 'react-markdown';
import type { Message } from '@/hooks/useChat';
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className={styles.userRow}>
        <div className={styles.userBubble}>{message.text}</div>
      </div>
    );
  }
  return (
    <div className={styles.botRow}>
      <div className={styles.botAvatar}>E</div>
      <div className={styles.botBubble}>
        <div className={styles.botName}>Exactly</div>
        <div className={styles.botText}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
