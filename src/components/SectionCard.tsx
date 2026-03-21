import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListHeader } from '@toss/tds-mobile';
import type { PropsWithChildren, ReactNode } from 'react';

interface SectionCardProps extends PropsWithChildren {
  title?: string;
  action?: ReactNode;
}

const SectionCardContainer = styled.section({
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '24px',
  background: colors.background,
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
});

const SectionHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
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
