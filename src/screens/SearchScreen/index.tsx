import styled from '@emotion/styled';
import { SegmentedControl } from '@toss/tds-mobile';
import type { Vendor } from '../../types';
import { Chip } from '../../components/Chip';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface SearchScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
}

export function SearchScreen({ vendors, onOpenVendor }: SearchScreenProps) {
  return (
    <>
      <SectionCard>
        <InlineSummary>강남 · 2026.03.15 · 2시간</InlineSummary>
        <SegmentWrap>
          <SegmentedControl defaultValue="list" size="small">
            <SegmentedControl.Item value="list">리스트</SegmentedControl.Item>
            <SegmentedControl.Item value="map">지도</SegmentedControl.Item>
          </SegmentedControl>
        </SegmentWrap>
        <ChipRow>
          <Chip>가격</Chip>
          <Chip>거리</Chip>
          <Chip>평점</Chip>
        </ChipRow>
        <MapPlaceholder>지도 영역</MapPlaceholder>
      </SectionCard>

      <SectionCard title="검색 결과">
        <Stack>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onClick={onOpenVendor} />
          ))}
        </Stack>
      </SectionCard>
    </>
  );
}

const InlineSummary = styled.div({
  color: '#334155',
  fontWeight: 600,
});

const SegmentWrap = styled.div({
  marginTop: '12px',
});

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

const MapPlaceholder = styled.div({
  marginTop: '12px',
  height: '160px',
  borderRadius: '18px',
  background:
    'linear-gradient(135deg, rgba(49, 130, 246, 0.18), rgba(37, 99, 235, 0.05)), #eff6ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#2563eb',
  fontWeight: 700,
});

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});
