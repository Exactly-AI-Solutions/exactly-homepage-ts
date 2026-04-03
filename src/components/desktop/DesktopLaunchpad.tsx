'use client';
import { useRef, KeyboardEvent } from 'react';
import type { ChatState, ChatActions } from '@/hooks/useChat';
import TopNav from './TopNav';
import LogoWordmark from '@/components/shared/LogoWordmark';
import styles from './DesktopLaunchpad.module.css';

const PILLS = [
  { label: 'CRO Score', context: 'cro-score' },
  { label: 'Your SWOT', context: 'swot' },
  { label: 'AI Wins', context: 'quick-wins' },
  { label: 'AI Visibility', context: 'ai-visibility' },
  { label: 'About Exactly', context: 'exactly-difference' },
];

type Props = ChatState & ChatActions;

export default function DesktopLaunchpad({ send, context: activeContext }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className={styles.layout}>
      <TopNav
        activeContext={activeContext}
        onNavClick={(label, ctx) => send(label, ctx)}
      />

      <main className={styles.main}>
        <div className={styles.heroUnit}>
          <h1 className={styles.headline}>
            What Is AI Saying<br />About Your <em>Business?</em>
          </h1>
          <h2 className={styles.h2}>Hint: It&rsquo;s not what you think</h2>
          <h3 className={styles.h3}>Type or click to find out</h3>
          <p className={styles.subhead}>No login required</p>

          <div className={styles.chatWrap}>
            <div className={styles.inputRow}>
              <div className={styles.inputWrap}>
                <textarea
                  ref={textareaRef}
                  className={styles.textarea}
                  placeholder="What on my homepage might be costing me leads?"
                  onKeyDown={handleKey}
                  rows={3}
                />
                <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.pills}>
              {PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className={styles.pill}
                  onClick={() => send(pill.label, pill.context)}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerLeft}>
            <div className={styles.footerLogoWrap}>
              <LogoWordmark height={36} className={styles.footerLogoSvg} style={{ filter: 'invert(1)', opacity: 1 }} />
            </div>
            <p className={styles.footerTagline}>
              Exactly AI builds done-for-you AI solutions for growing businesses.
              No tools, no training — just outcomes.
            </p>
            <p className={styles.footerPrivacy}>
              We never store your site data without permission.
            </p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.footerSocialLink} aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className={styles.footerSocialLink} aria-label="Twitter/X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.footerNav}>
            <p className={styles.footerNavLabel}>AI Solutions</p>
            <a href="#" className={styles.footerNavLink}>Quick Wins For Your Business</a>
            <a href="#" className={styles.footerNavLink}>Deep Dive Reports</a>
            <a href="#" className={styles.footerNavLink}>CRO Chatbot For My Website</a>
            <p className={styles.footerNavLabel}>Company</p>
            <a href="#" className={styles.footerNavLink}>The Exactly Difference</a>
            <a href="#" className={styles.footerNavLink}>Who We Are</a>
            <a href="#" className={styles.footerNavLink}>How It Works</a>
          </div>

          <div>
            <div className={styles.footerChatbotCallout}>
              <p>See an AI chatbot that actually converts — built for businesses like yours.</p>
              <a href="#">Try the CRO Chatbot &rarr;</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <span className={styles.footerCopy}>&copy; {new Date().getFullYear()} Exactly AI Solutions. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
