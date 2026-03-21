import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
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

const SectionTitle = styled.h2({
  margin: 0,
  fontSize: '18px',
});

export function SectionCard({ title, action, children }: SectionCardProps) {
  return (
    <SectionCardContainer>
      {title ? (
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          {action}
        </SectionHeader>
      ) : null}
      {children}
    </SectionCardContainer>
  );
}
