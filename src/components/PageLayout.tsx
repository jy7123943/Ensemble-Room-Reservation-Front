import styled from "@emotion/styled";
import type { PropsWithChildren, ReactNode } from "react";
import { Asset, Top } from "@toss/tds-mobile";

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
          <Asset.Image
            src="/guitar.png"
            alt="Rehearsal Room Booking"
            frameShape={{ width: 44, height: 44 }}
            scaleType="fit"
            style={{ marginBottom: 12 }}
          />
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
