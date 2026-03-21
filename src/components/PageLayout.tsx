import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import type { PropsWithChildren, ReactNode } from "react";
import { ListHeader } from "@toss/tds-mobile";

interface PageLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
}

const PageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  background: colors.white,
});

const PageContent = styled.main({
  flex: 1,
  padding: "0 0 40px",
});

export function PageLayout({
  title,
  subtitle,
  footer,
  children,
}: PageLayoutProps) {
  return (
    <PageWrapper>
      <PageContent>
        <HeaderContent>
          <HeaderRow>
            <HeaderTextGroup>
              <HeaderTitle typography="t4" fontWeight="bold">
                {title}
              </HeaderTitle>
              {subtitle ? (
                <HeaderDescription>{subtitle}</HeaderDescription>
              ) : null}
            </HeaderTextGroup>
            <ProfilePill>
              <ProfileImage src="/guitar.png" alt="Rehearsal Room Booking" />
            </ProfilePill>
          </HeaderRow>
        </HeaderContent>
        {children}
      </PageContent>
      {footer}
    </PageWrapper>
  );
}

const HeaderContent = styled.header({
  padding: "24px 20px 20px",
});

const HeaderRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  paddingBottom: "12px",
});

const HeaderTextGroup = styled.div({
  flex: 1,
  minWidth: 0,
  textAlign: "left",
});

const HeaderTitle = styled(ListHeader.TitleParagraph)({
  display: "block",
  width: "100%",
});

const HeaderDescription = styled(ListHeader.DescriptionParagraph)({
  display: "block",
  width: "100%",
});

const HeaderTitleText = styled.span({
  display: "block",
  width: "100%",
  textAlign: "left",
  fontSize: "20px",
  lineHeight: 1.3,
});

const HeaderDescriptionText = styled.span({
  display: "block",
  width: "100%",
  textAlign: "left",
  marginTop: "4px",
  fontSize: "14px",
  lineHeight: 1.5,
  color: colors.grey700,
});

const ProfilePill = styled.div({
  display: "grid",
  placeItems: "center",
  width: "52px",
  height: "52px",
  borderRadius: "20px",
  background: colors.blue50,
  color: colors.blue500,
  flexShrink: 0,
});

const ProfileImage = styled.img({
  width: "34px",
  height: "34px",
  objectFit: "contain",
});
