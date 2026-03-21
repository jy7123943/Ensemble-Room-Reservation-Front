import { Badge } from '@toss/tds-mobile';
import type { PropsWithChildren } from 'react';

interface ChipProps extends PropsWithChildren {
  active?: boolean;
}

export function Chip({ active = false, children }: ChipProps) {
  return (
    <Badge size="small" variant="weak" color={active ? 'blue' : 'elephant'}>
      {children}
    </Badge>
  );
}
