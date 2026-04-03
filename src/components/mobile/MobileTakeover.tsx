'use client';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { ChatState, ChatActions } from '@/hooks/useChat';
import MobileNav from './MobileNav';
import Drawer from './Drawer';
import MessageBubble from '@/components/shared/MessageBubble';
import TypingIndicator from '@/components/shared/TypingIndicator';
import styles from './MobileTakeover.module.css';

type Props = ChatState & ChatActions;

export default function MobileTakeover({ messages, isTyping, context, send, reset }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <>
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onItemClick={(label, ctx) => send(label, ctx)}
      />

      <div className={styles.pageWrap}>
        <MobileNav
          isDrawerOpen={drawerOpen}
          onToggle={() => setDrawerOpen((v) => !v)}
        />

        {/* Bot topbar */}
        <div className={styles.chatTopbar}>
          <div className={styles.topbarAvatar}>E</div>
          <span className={styles.topbarName}>Exactly</span>
          <span className={styles.statusDot} />
          <button className={styles.resetBtn} onClick={reset}>← New chat</button>
        </div>

        {/* Messages */}
        <div className={styles.chatScroll}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        {/* Input bar */}
        <div className={styles.inputBar}>
          <div className={styles.inputWrap}>
            <textarea
              ref={textareaRef}
              className={styles.chatInput}
              placeholder="Ask a follow-up…"
              onKeyDown={handleKey}
              rows={1}
            />
            <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="4"/>
                <polyline points="5 12 12 5 19 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
