'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import type { ChatState, ChatActions } from '@/hooks/useChat';
import MobileNav from './MobileNav';
import Drawer from './Drawer';
import LogoWordmark from '@/components/shared/LogoWordmark';
import styles from './MobileLaunchpad.module.css';

const PILLS = [
  { label: 'AI Wins', context: 'quick-wins' },
  { label: 'CRO Score', context: 'cro-score' },
  { label: 'AI Visibility', context: 'ai-visibility' },
  { label: 'About Exactly', context: 'exactly-difference' },
];

const CARDS = [
  { bg: '#7D8F3C', titleColor: '#1B2A4A', title: 'QUICK', title2: 'WINS', sub: 'Delivered in chat in seconds', context: 'quick-wins', subColor: '#ffffff' },
  { bg: '#1B2A4A', titleColor: 'rgba(255,255,255,0.92)', title: 'DEEP', title2: 'DIVES', sub: 'In your inbox in minutes', context: 'deep-dives', subColor: 'rgba(255,255,255,0.72)' },
  { bg: '#E8532A', titleColor: 'rgba(255,255,255,0.92)', title: 'CRO', title2: 'CHATBOT', sub: 'Turn visitors into conversions', context: 'cro-chatbots', subColor: 'rgba(255,255,255,0.72)' },
  { bg: '#2D5A2D', titleColor: '#FF6B00', title: 'YOUR AI', title2: 'ROADMAP', sub: 'Book an AI Consultation', context: 'ai-roadmap', subColor: 'rgba(255,255,255,0.8)' },
  { bg: '#FFD700', titleColor: 'rgba(0,0,0,0.75)', titleThe: 'THE', title: 'EXACTLY', title2: 'DIFFERENCE', sub: 'Done-for-you outcomes', context: 'exactly-difference', subColor: '#2E2925', titleSmall: true },
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
          <LogoWordmark height={28} style={{ color: '#FFFFFF', opacity: 0.9 }} />
        </div>
        <h3 className={styles.footerHeadline}>
          AI Without The <span className={styles.footerHeadlineGreen}>Hassle</span>
        </h3>
        <p className={styles.footerTagline}>Done-For-You AI with guaranteed results.</p>
        <div className={styles.footerLinks}>
          <p className={styles.footerNavLabel}>Explore</p>
          <a href="#" className={styles.footerNavLink}>Quick Wins For Your Business</a>
          <a href="#" className={styles.footerNavLink}>Deep Dive Reports</a>
          <a href="#" className={styles.footerNavLink}>CRO Chatbot For My Website</a>
          <a href="#" className={styles.footerNavLink}>The Exactly Difference</a>
        </div>
        <div className={styles.footerSocial}>
          <a href="mailto:deb@exactlyai.solutions" className={styles.footerSocialLink} aria-label="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/exactly-ai-solutions/" target="_blank" rel="noopener" className={styles.footerSocialLink} aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="tel:+12128138134" className={styles.footerSocialLink} aria-label="Phone">
            <svg width="13" height="16" viewBox="0 0 14 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="1" width="12" height="20" rx="3" ry="3"/>
              <line x1="5" y1="2.5" x2="9" y2="2.5" strokeWidth="1.2"/>
              <circle cx="7" cy="18.5" r="0.8" fill="white" stroke="none"/>
            </svg>
          </a>
        </div>
        <p className={styles.footerPrivacy}>We don&rsquo;t sell your data. Ever.</p>
        <p className={styles.footerPrivacy}>This site uses cookies to improve your experience.</p>
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
