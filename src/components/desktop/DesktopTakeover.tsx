'use client';
import { useRef, useEffect, KeyboardEvent } from 'react';
import type { ChatState, ChatActions } from '@/hooks/useChat';
import TopNav from './TopNav';
import MessageBubble from '@/components/shared/MessageBubble';
import TypingIndicator from '@/components/shared/TypingIndicator';
import styles from './DesktopTakeover.module.css';

type Props = ChatState & ChatActions;

export default function DesktopTakeover({ messages, isTyping, context, send, reset }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend() {
    const text = textareaRef.current?.value.trim();
    if (!text) return;
    send(text);
    if (textareaRef.current) textareaRef.current.value = '';
  }

  function handleKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={styles.page}>
      <TopNav
        activeContext={context}
        onNavClick={(label, ctx) => send(label, ctx)}
      />

      <div className={styles.rightPanel}>
        {/* Chat topbar */}
        <div className={styles.chatTopbar}>
          <div className={styles.topbarAvatar}>E</div>
          <div className={styles.topbarInfo}>
            <div className={styles.topbarName}>Exactly</div>
            <div className={styles.topbarStatus}>
              <span className={styles.statusDot} />
              <span>AI agent · online</span>
            </div>
          </div>
          <div className={styles.topbarActions}>
            <button className={styles.topbarReset} onClick={reset}>
              ← New conversation
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className={styles.chatArea}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div className={styles.chatInputBar}>
          <div className={styles.chatInputWrapper}>
            <textarea
              ref={textareaRef}
              className={styles.chatInput}
              placeholder="Ask a follow-up question…"
              onKeyDown={handleKey}
              rows={1}
            />
            <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="4"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
