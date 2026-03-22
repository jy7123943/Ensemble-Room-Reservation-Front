import styled from '@emotion/styled';
import type { Vendor } from '../../types';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface FavoritesScreenProps {
  vendors: Vendor[];
  onOpenVendor: (vendorId: string) => void;
}

export function FavoritesScreen({ vendors, onOpenVendor }: FavoritesScreenProps) {
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
