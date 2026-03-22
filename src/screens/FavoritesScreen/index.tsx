import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import type { Vendor } from '../../types';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface FavoritesScreenProps {
  vendors: Vendor[];
  onOpenVendor: (vendorId: string) => void;
}

export function FavoritesScreen({ vendors, onOpenVendor }: FavoritesScreenProps) {
  if (vendors.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>&#9825;</EmptyIcon>
        <EmptyText>찜한 합주실이 없습니다</EmptyText>
        <EmptySubText>마음에 드는 합주실을 찜해보세요</EmptySubText>
      </EmptyState>
    );
  }

  return (
    <SectionCard title="찜한 업체">
      <Stack>
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onClick={() => onOpenVendor(vendor.id)} />
        ))}
      </Stack>
    </SectionCard>
  );
}

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: 0,
});

const EmptyState = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '80px 20px',
  textAlign: 'center',
});

const EmptyIcon = styled.span({
  fontSize: '48px',
  marginBottom: '16px',
  color: colors.grey300,
});

const EmptyText = styled.p({
  margin: 0,
  fontSize: '17px',
  fontWeight: 700,
  color: colors.grey900,
});

const EmptySubText = styled.p({
  margin: '8px 0 0',
  fontSize: '14px',
  color: colors.grey500,
});
