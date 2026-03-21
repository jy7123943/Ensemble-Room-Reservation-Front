import type { Vendor } from '../types';
import { SectionCard } from '../components/SectionCard';
import { VendorCard } from '../components/VendorCard';

interface FavoritesScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
}

export function FavoritesScreen({ vendors, onOpenVendor }: FavoritesScreenProps) {
  return (
    <SectionCard title="찜한 업체">
      <div className="stack">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} onClick={onOpenVendor} />
        ))}
      </div>
    </SectionCard>
  );
}
