import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import type { Vendor } from '../types';
import { Chip } from './Chip';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
}

const VendorButton = styled.button({
  display: 'flex',
  gap: '12px',
  width: '100%',
  border: 0,
  background: colors.grey50,
  padding: 0,
  borderRadius: '20px',
  overflow: 'hidden',
  textAlign: 'left',
});

const VendorImage = styled.img({
  width: '108px',
  height: '108px',
  flexShrink: 0,
  objectFit: 'cover',
});

const VendorCopy = styled.div({
  padding: '12px 12px 12px 0',
  minWidth: 0,
});

const VendorHead = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
});

const MutedParagraph = styled.p({
  margin: '4px 0',
  color: colors.grey600,
});

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

export function VendorCard({ vendor, onClick }: VendorCardProps) {
  return (
    <VendorButton type="button" onClick={onClick}>
      <VendorImage src={vendor.imageUrl} alt={vendor.name} />
      <VendorCopy>
        <VendorHead>
          <strong>{vendor.name}</strong>
          <span>★ {vendor.rating}</span>
        </VendorHead>
        <MutedParagraph>{vendor.distance}</MutedParagraph>
        <MutedParagraph>{vendor.priceLabel}</MutedParagraph>
        <ChipRow>
          {vendor.amenities.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </ChipRow>
      </VendorCopy>
    </VendorButton>
  );
}
