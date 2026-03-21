import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';
import type { Vendor } from '../types';
import { Chip } from './Chip';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
  variant?: 'default' | 'featured';
}

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

export function VendorCard({
  vendor,
  onClick,
  variant = 'default',
}: VendorCardProps) {
  if (variant === 'featured') {
    return (
      <FeaturedCard type="button" onClick={onClick}>
        <FeaturedImage src={vendor.imageUrl} alt={vendor.name} />
        <FeaturedBody>
          <FeaturedTopLine>
            <FeaturedName>{vendor.name}</FeaturedName>
            <Chip>{vendor.distance}</Chip>
          </FeaturedTopLine>
          <FeaturedMeta>
            ★ {vendor.rating} ({vendor.reviewCount}) · {vendor.priceLabel}
          </FeaturedMeta>
          <ChipRow>
            {vendor.amenities.slice(0, 3).map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </ChipRow>
        </FeaturedBody>
      </FeaturedCard>
    );
  }

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

const FeaturedCard = styled.button({
  width: '100%',
  padding: 0,
  border: 0,
  background: 'transparent',
  textAlign: 'left',
});

const FeaturedImage = styled.img({
  display: 'block',
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '28px',
});

const FeaturedBody = styled.div({
  paddingTop: '14px',
});

const FeaturedTopLine = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '12px',
});

const FeaturedName = styled.strong({
  color: colors.grey900,
  fontSize: '20px',
  lineHeight: 1.35,
});

const FeaturedMeta = styled.p({
  margin: '8px 0 0',
  color: colors.grey600,
  fontSize: '14px',
  lineHeight: 1.5,
});
