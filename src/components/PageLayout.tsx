import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
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
  minHeight: "100vh",
  background: colors.greyOpacity50,
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
