import styled from "@emotion/styled";
import type { PropsWithChildren, ReactNode } from "react";
import { Top } from "@toss/tds-mobile";

interface PageLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  topBar?: ReactNode;
  footer?: ReactNode;
}

const PageWrapper = styled.div({
  width: "100%",
  maxWidth: "800px",
  minHeight: "100vh",
  background: "#fff",
  backdropFilter: "blur(16px)",
});

const PageContent = styled.main({
  padding: "16px 20px 110px",
});

const HeroBlock = styled.section({
  marginBottom: "20px",
});

const Eyebrow = styled.p({
  margin: "0 0 8px",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#2563eb",
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
    <PageWrapper>
      {topBar}
      <PageContent>
        <HeroBlock>
          <Eyebrow>Rehearsal Room Booking</Eyebrow>
          <Top
            upperGap={0}
            lowerGap={0}
            title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
            subtitleBottom={
              subtitle ? (
                <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph>
              ) : undefined
            }
          />
        </HeroBlock>
        {children}
      </PageContent>
      {footer}
    </PageWrapper>
  );
}
