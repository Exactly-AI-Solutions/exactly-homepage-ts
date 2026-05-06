import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--bebas-neue',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Exactly AI Solutions',
  description: 'AI-powered growth solutions for your business',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-0DX04GD5XT" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0DX04GD5XT');
        `}</Script>
        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wmhj3c9eg8");
        `}</Script>
      </head>
      <body>{children}<Analytics /></body>
    </html>
  );
}
