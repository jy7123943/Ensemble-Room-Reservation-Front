import styled from '@emotion/styled';
import { ListRow } from '@toss/tds-mobile';
import type { Vendor } from '../types';
import { Chip } from './Chip';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
}

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

export function VendorCard({ vendor, onClick }: VendorCardProps) {
  return (
    <ListRow
      border="none"
      withTouchEffect
      arrowType={onClick ? 'right' : undefined}
      onClick={onClick}
      left={
        <ListRow.AssetImage
          src={vendor.imageUrl}
          shape="square"
          size="medium"
        />
      }
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={vendor.name}
          middle={`${vendor.distance} · ★ ${vendor.rating}`}
          bottom={
            <ChipRow>
              <Chip>{vendor.priceLabel}</Chip>
              {vendor.amenities.slice(0, 2).map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ChipRow>
          }
        />
      }
    />
  );
}
