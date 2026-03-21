import { SearchField } from '@toss/tds-mobile';
import type { Vendor } from '../types';
import { Chip } from '../components/Chip';
import { SectionCard } from '../components/SectionCard';
import { VendorCard } from '../components/VendorCard';

interface HomeScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
  onOpenSearch: () => void;
}

export function HomeScreen({ vendors, onOpenVendor, onOpenSearch }: HomeScreenProps) {
  return (
    <>
      <SectionCard>
        <div className="search-trigger" onClick={onOpenSearch} role="button" tabIndex={0}>
          <SearchField placeholder="지역, 업체명 검색" />
        </div>
        <div className="chip-row">
          <Chip active>오늘</Chip>
          <Chip>내일</Chip>
          <Chip>주말</Chip>
          <Chip>2시간</Chip>
        </div>
      </SectionCard>

      <SectionCard title="가까운 합주실">
        <div className="stack">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onClick={onOpenVendor} />
          ))}
        </div>
      </SectionCard>
    </>
  );
}
