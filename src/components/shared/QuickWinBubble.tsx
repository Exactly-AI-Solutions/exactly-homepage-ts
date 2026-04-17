'use client';
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import styles from './QuickWinBubble.module.css';

interface Props {
  text: string;
  format: 'accordion' | 'pullquotes';
}

interface Section {
  label: string;
  body: string;
}

function parseIntoSections(markdown: string): { intro: string; sections: Section[] } {
  const parts = markdown.split(/\n(?=## )/);
  let intro = '';
  const sections: Section[] = [];

  for (const part of parts) {
    const headingMatch = part.match(/^## (.+)\n?([\s\S]*)/);
    if (headingMatch) {
      sections.push({ label: headingMatch[1].trim(), body: headingMatch[2].trim() });
    } else {
      intro = part.trim();
    }
  }

  return { intro, sections };
}

function isPreparedLine(line: string) {
  return /^\*?Prepared by/i.test(line.trim()) || line.trim() === '---';
}

function stripPrepared(markdown: string): { body: string; prepared: string } {
  const lines = markdown.split('\n');
  let cutAt = lines.length;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === '') continue;
    if (isPreparedLine(lines[i])) {
      cutAt = i;
    }
    break;
  }
  return {
    body: lines.slice(0, cutAt).join('\n').trim(),
    prepared: lines
      .slice(cutAt)
      .join(' ')
      .replace(/^\*|\*$/g, '')
      .replace(/---/g, '')
      .trim(),
  };
}

const pullquoteComponents: Components = {
  p({ children }) {
    const childArr = Array.isArray(children) ? children : [children];
    if (
      childArr.length === 1 &&
      typeof childArr[0] === 'object' &&
      childArr[0] !== null &&
      'type' in (childArr[0] as React.ReactElement) &&
      (childArr[0] as React.ReactElement).type === 'strong'
    ) {
      return <div className={styles.pull}>{children}</div>;
    }
    return <p>{children}</p>;
  },
};

function AccordionSection({ label, body, defaultOpen }: { label: string; body: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.accItem}>
      <button
        className={`${styles.accTrigger}${open ? ` ${styles.accTriggerOpen}` : ''}`}
        onClick={() => setOpen((o) => !o)}
        type="button"
      >
        <span className={styles.accLabel}>{label}</span>
        <span className={`${styles.accChevron}${open ? ` ${styles.accChevronOpen}` : ''}`}>▾</span>
      </button>
      <div className={`${styles.accBody}${open ? ` ${styles.accBodyOpen}` : ''}`}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

function FormatToggle({
  active,
  onChange,
}: {
  active: 'accordion' | 'pullquotes';
  onChange: (f: 'accordion' | 'pullquotes') => void;
}) {
  return (
    <div className={styles.toggle}>
      <button
        type="button"
        className={`${styles.toggleBtn}${active === 'accordion' ? ` ${styles.toggleBtnActive}` : ''}`}
        onClick={() => onChange('accordion')}
      >
        Accordion
      </button>
      <button
        type="button"
        className={`${styles.toggleBtn}${active === 'pullquotes' ? ` ${styles.toggleBtnActive}` : ''}`}
        onClick={() => onChange('pullquotes')}
      >
        Pull Quotes
      </button>
    </div>
  );
}

export default function QuickWinBubble({ text, format: initialFormat }: Props) {
  const [format, setFormat] = useState<'accordion' | 'pullquotes'>(initialFormat);
  const { body: cleanText, prepared } = useMemo(() => stripPrepared(text), [text]);
  const { intro, sections } = useMemo(() => parseIntoSections(cleanText), [cleanText]);

  const hasCta = cleanText.includes('Go deeper') || sections.length > 0;

  const ctaAndFooter = (
    <>
      {hasCta && (
        <div className={styles.ctaRow}>
          <a href="#" className={`${styles.ctaBtn} ${styles.ctaPrimary}`}>Go deeper on this →</a>
          <a href="#" className={`${styles.ctaBtn} ${styles.ctaSecondary}`}>Download as PDF</a>
        </div>
      )}
      {prepared && <div className={styles.prepared}>{prepared}</div>}
    </>
  );

  return (
    <div className={styles.bubble}>
      {sections.length > 0 && <FormatToggle active={format} onChange={setFormat} />}

      {format === 'pullquotes' ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={pullquoteComponents}>
          {cleanText}
        </ReactMarkdown>
      ) : (
        <>
          {intro && (
            <div className={styles.intro}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
            </div>
          )}
          {sections.length > 0 && (
            <div className={styles.accordion}>
              {sections.map((sec, i) => (
                <AccordionSection key={i} label={sec.label} body={sec.body} defaultOpen={i === 0} />
              ))}
            </div>
          )}
          {sections.length === 0 && !intro && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cleanText}</ReactMarkdown>
          )}
        </>
      )}

      {ctaAndFooter}
    </div>
  );
}
