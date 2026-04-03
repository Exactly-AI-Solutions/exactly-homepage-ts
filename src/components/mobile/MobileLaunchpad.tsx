'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import type { ChatState, ChatActions } from '@/hooks/useChat';
import MobileNav from './MobileNav';
import Drawer from './Drawer';
import LogoWordmark from '@/components/shared/LogoWordmark';
import styles from './MobileLaunchpad.module.css';

const PILLS = [
  { label: 'CRO Score', context: 'cro-score' },
  { label: 'Your SWOT', context: 'swot' },
  { label: 'AI Wins', context: 'quick-wins' },
  { label: 'AI Visibility', context: 'ai-visibility' },
  { label: 'About Exactly', context: 'exactly-difference' },
];

const CARDS = [
  { bg: '#7D8F3C', titleColor: '#1B2A4A', title: 'QUICK', title2: 'WINS', sub: 'For your business', context: 'quick-wins', subColor: '#ffffff' },
  { bg: '#1B2A4A', titleColor: 'rgba(255,255,255,0.92)', title: 'DEEP', title2: 'DIVES', sub: 'Full AI report', context: 'deep-dives', subColor: 'rgba(255,255,255,0.72)' },
  { bg: '#E8532A', titleColor: 'rgba(255,255,255,0.92)', title: 'CRO', title2: 'CHATBOT', sub: 'For my website', context: 'cro-chatbots', subColor: 'rgba(255,255,255,0.72)' },
  { bg: '#2D5A2D', titleColor: '#FF6B00', titleThe: 'THE', title: 'EXACTLY', title2: 'DIFFERENCE', sub: "Why we're different", context: 'exactly-difference', subColor: 'rgba(255,255,255,0.72)' },
  { bg: '#FFD700', titleColor: 'rgba(0,0,0,0.75)', title: 'YOUR', title2: 'AI ROADMAP', sub: 'Where to start', context: 'ai-roadmap', subColor: '#2E2925', titleSmall: true },
];

type Props = ChatState & ChatActions;

export default function MobileLaunchpad({ send }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    <>
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onItemClick={(label, ctx) => send(label, ctx)}
      />

      <div className={styles.heroAndFirst}>
        <div className={styles.hero}>
          <MobileNav
            isDrawerOpen={drawerOpen}
            onToggle={() => setDrawerOpen((v) => !v)}
          />

          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>AI-Powered Growth</p>
            <h1 className={styles.headline}>
              WHAT IS AI<br />SAYING<br />ABOUT YOUR<br /><em>BUSINESS?</em>
            </h1>
            <h2 className={styles.h2}>Hint: It&rsquo;s not what you think</h2>
            <h3 className={styles.h3}>Type or click to find out</h3>
            <p className={styles.subhead}>No login required</p>

            <div className={styles.chatBox}>
              <textarea
                ref={textareaRef}
                className={styles.chatInput}
                placeholder="What on my homepage might be costing me leads?"
                onKeyDown={handleKey}
                rows={3}
              />
              <div className={styles.chatFooter}>
                <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.pillsGrid}>
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

          <div className={styles.exploreWrap}>
            <span className={styles.exploreLabel}>Explore</span>
            <svg className={styles.exploreArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Cards section (below fold) */}
      <div className={styles.cards}>
        {CARDS.map((card) => (
          <div
            key={card.context}
            className={styles.card}
            style={{ background: card.bg }}
            onClick={() => send(card.sub, card.context)}
          >
            <div className={styles.cardContent}>
              {card.titleThe && (
                <span className={styles.cardTitleThe} style={{ color: card.titleColor }}>{card.titleThe}</span>
              )}
              <span className={styles.cardTitleBig} style={{ color: card.titleColor, fontSize: card.titleSmall ? '52px' : undefined }}>{card.title}</span>
              <span className={styles.cardTitleBig} style={{ color: card.titleColor, fontSize: card.titleSmall ? '52px' : undefined }}>{card.title2}</span>
              <div className={styles.cardFoot}>
                <span className={styles.cardSub} style={{ color: card.subColor }}>{card.sub}</span>
                <span className={styles.cardArrow} style={{ color: card.subColor }}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLogoWrap}>
          <LogoWordmark height={28} style={{ filter: 'invert(1)', opacity: 0.9 }} />
        </div>
        <h3 className={styles.footerHeadline}>
          AI that <span className={styles.footerHeadlineGreen}>actually works</span><br />
          for your business.
        </h3>
        <p className={styles.footerTagline}>
          Done-for-you AI solutions. No tools, no training — just outcomes.
        </p>
        <div className={styles.footerLinks}>
          <p className={styles.footerNavLabel}>AI Solutions</p>
          <a href="#" className={styles.footerNavLink}>Quick Wins For Your Business</a>
          <a href="#" className={styles.footerNavLink}>Deep Dive Reports</a>
          <a href="#" className={styles.footerNavLink}>CRO Chatbot For My Website</a>
          <p className={styles.footerNavLabel}>Company</p>
          <a href="#" className={styles.footerNavLink}>The Exactly Difference</a>
          <a href="#" className={styles.footerNavLink}>Who We Are</a>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerLegal}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Exactly AI Solutions</p>
        </div>
      </footer>
    </>
  );
}
