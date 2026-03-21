import { SegmentedControl } from '@toss/tds-mobile';
import type { Vendor } from '../types';
import { Chip } from '../components/Chip';
import { SectionCard } from '../components/SectionCard';
import { VendorCard } from '../components/VendorCard';

interface SearchScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
}

export function SearchScreen({ vendors, onOpenVendor }: SearchScreenProps) {
  return (
    <>
      <SectionCard>
        <div className="inline-summary">강남 · 2026.03.15 · 2시간</div>
        <div className="tds-segment-wrap">
          <SegmentedControl defaultValue="list" size="small">
            <SegmentedControl.Item value="list">리스트</SegmentedControl.Item>
            <SegmentedControl.Item value="map">지도</SegmentedControl.Item>
          </SegmentedControl>
        </div>
        <div className="chip-row">
          <Chip>가격</Chip>
          <Chip>거리</Chip>
          <Chip>평점</Chip>
        </div>
        <div className="map-placeholder">지도 영역</div>
      </SectionCard>

      <SectionCard title="검색 결과">
        <div className="stack">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onClick={onOpenVendor} />
          ))}
        </div>
      </SectionCard>
    </>
  );
}
