import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

interface ChipProps extends PropsWithChildren {
  active?: boolean;
}

const ChipPill = styled.span<{ active?: boolean }>(({ active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '32px',
  padding: '6px 12px',
  borderRadius: '999px',
  background: active ? '#dbeafe' : '#edf2f7',
  color: active ? '#1d4ed8' : '#475569',
  fontSize: '13px',
  fontWeight: active ? 700 : 500,
}));

export function Chip({ active = false, children }: ChipProps) {
  return <ChipPill active={active}>{children}</ChipPill>;
}
