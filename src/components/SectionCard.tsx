import styled from "@emotion/styled";
import { ListHeader } from "@toss/tds-mobile";
import type { PropsWithChildren, ReactNode } from "react";

interface SectionCardProps extends PropsWithChildren {
  title?: string;
  action?: ReactNode;
}

const SectionCardContainer = styled.section({
  marginBottom: "28px",
});

const SectionHeader = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "14px",
  padding: "0 20px",
});

export function SectionCard({ title, action, children }: SectionCardProps) {
  return (
    <SectionCardContainer>
      {title ? (
        <SectionHeader>
          <ListHeader.TitleParagraph typography="t5" fontWeight="bold">
            {title}
          </ListHeader.TitleParagraph>
          {action}
        </SectionHeader>
      ) : null}
      {children}
    </SectionCardContainer>
  );
}
