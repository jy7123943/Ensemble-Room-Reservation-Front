import styled from '@emotion/styled';
import type { PropsWithChildren, ReactNode } from 'react';
import { Top } from '@toss/tds-mobile';

interface PageLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  topBar?: ReactNode;
  footer?: ReactNode;
}

const PhoneShell = styled.div({
  width: '100%',
  maxWidth: '430px',
  minHeight: 'calc(100vh - 48px)',
  background: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(148, 163, 184, 0.25)',
  borderRadius: '32px',
  overflow: 'hidden',
  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)',
  '@media (max-width: 480px)': {
    minHeight: '100vh',
    maxWidth: 'none',
    borderRadius: 0,
  },
});

const StatusBar = styled.div({
  height: '12px',
  background: 'linear-gradient(90deg, #3182f6, #65a6ff)',
});

const PageContent = styled.main({
  padding: '16px 20px 110px',
});

const HeroBlock = styled.section({
  marginBottom: '20px',
});

const Eyebrow = styled.p({
  margin: '0 0 8px',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#2563eb',
  fontWeight: 700,
});

export function PageLayout({
  title,
  subtitle,
  topBar,
  footer,
  children,
}: PageLayoutProps) {
  return (
    <PhoneShell>
      <StatusBar />
      {topBar}
      <PageContent>
        <HeroBlock>
          <Eyebrow>Rehearsal Room Booking</Eyebrow>
          <Top
            upperGap={0}
            lowerGap={0}
            title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
            subtitleBottom={
              subtitle ? <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph> : undefined
            }
          />
        </HeroBlock>
        {children}
      </PageContent>
      {footer}
    </PhoneShell>
  );
}
