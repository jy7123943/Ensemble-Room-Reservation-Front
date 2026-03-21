import styled from '@emotion/styled';
import { SearchField } from '@toss/tds-mobile';
import type { Vendor } from '../../types';
import { Chip } from '../../components/Chip';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface HomeScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
  onOpenSearch: () => void;
}

export function HomeScreen({ vendors, onOpenVendor, onOpenSearch }: HomeScreenProps) {
  return (
    <>
      <SectionCard>
        <SearchTrigger onClick={onOpenSearch} role="button" tabIndex={0}>
          <SearchField placeholder="지역, 업체명 검색" />
        </SearchTrigger>
        <ChipRow>
          <Chip active>오늘</Chip>
          <Chip>내일</Chip>
          <Chip>주말</Chip>
          <Chip>2시간</Chip>
        </ChipRow>
      </SectionCard>

      <SectionCard title="가까운 합주실">
        <Stack>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} onClick={onOpenVendor} />
          ))}
        </Stack>
      </SectionCard>
    </>
  );
}

const SearchTrigger = styled.div({
  cursor: 'pointer',
});

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});
