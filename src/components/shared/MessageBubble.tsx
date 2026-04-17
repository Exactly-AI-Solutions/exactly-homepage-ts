import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '@/hooks/useChat';
import styles from './MessageBubble.module.css';
import QuickWinBubble from './QuickWinBubble';

export default function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className={styles.userRow}>
        <div className={styles.userBubble}>{message.text}</div>
      </div>
    );
  }

  const isQuickWinAccordion = message.displayFormat === 'quickwin-accordion';
  const isQuickWinPullquotes = message.displayFormat === 'quickwin-pullquotes';

  return (
    <div className={styles.botRow}>
      <div className={styles.botAvatar}>E</div>
      <div className={styles.botBubble}>
        <div className={styles.botName}>Exactly</div>
        {isQuickWinAccordion ? (
          <QuickWinBubble text={message.text} format="accordion" />
        ) : isQuickWinPullquotes ? (
          <QuickWinBubble text={message.text} format="pullquotes" />
        ) : (
          <div className={styles.botText}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
