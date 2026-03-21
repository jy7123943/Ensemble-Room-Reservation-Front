import type { PropsWithChildren, ReactNode } from 'react';
import { Top } from '@toss/tds-mobile';

interface PageLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  topBar?: ReactNode;
  footer?: ReactNode;
}

export function PageLayout({
  title,
  subtitle,
  topBar,
  footer,
  children,
}: PageLayoutProps) {
  return (
    <div className="phone-shell">
      <div className="status-bar" />
      {topBar}
      <main className="page-content">
        <section className="hero-block">
          <p className="eyebrow">Rehearsal Room Booking</p>
          <Top
            upperGap={0}
            lowerGap={0}
            title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
            subtitleBottom={
              subtitle ? <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph> : undefined
            }
          />
        </section>
        {children}
      </main>
      {footer}
    </div>
  );
}
