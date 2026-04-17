'use client';
import dynamic from 'next/dynamic';
import styles from './CalendlyBubble.module.css';

const InlineWidget = dynamic(
  () => import('react-calendly').then((m) => m.InlineWidget),
  { ssr: false, loading: () => <div className={styles.loading}>Loading calendar…</div> }
);

const CALENDLY_URL = 'https://calendly.com/exactlyaisolutions/15min';

export default function CalendlyBubble() {
  return (
    <div className={styles.container}>
      <p className={styles.intro}>Pick a time that works for you:</p>
      <div className={styles.widget}>
        <InlineWidget
          url={CALENDLY_URL}
          styles={{ height: '630px', minWidth: '280px' }}
          pageSettings={{
            hideGdprBanner: true,
            hideLandingPageDetails: true,
            hideEventTypeDetails: true,
          }}
        />
      </div>
    </div>
  );
}
