import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
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
                <HeaderTitleText>{title}</HeaderTitleText>
              </HeaderTitle>
              {subtitle ? (
                <HeaderDescription>
                  <HeaderDescriptionText>{subtitle}</HeaderDescriptionText>
                </HeaderDescription>
              ) : null}
            </HeaderTextGroup>
            <ProfilePill>
              <ProfileIcon icon={faMusic} />
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
  padding: "20px 20px 18px",
});

const HeaderRow = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  paddingBottom: "16px",
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
});

const HeaderDescriptionText = styled.span({
  display: "block",
  width: "100%",
  textAlign: "left",
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

const ProfileIcon = styled(FontAwesomeIcon)({
  fontSize: "22px",
});
