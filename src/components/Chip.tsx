import type { PropsWithChildren } from 'react';

interface ChipProps extends PropsWithChildren {
  active?: boolean;
}

export function Chip({ active = false, children }: ChipProps) {
  return <span className={active ? 'chip chip-active' : 'chip'}>{children}</span>;
}
