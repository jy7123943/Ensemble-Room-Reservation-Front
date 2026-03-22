import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '@toss/tds-colors';
import { Badge, ListHeader } from '@toss/tds-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import type { Vendor } from '../../types';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface SearchScreenProps {
  vendors: Vendor[];
  onOpenVendor: (vendorId: string) => void;
}

// 마커 위치를 균등 분배
function getMarkerPosition(index: number, total: number) {
  const cols = Math.ceil(Math.sqrt(total));
  const row = Math.floor(index / cols);
  const col = index % cols;
  const xStep = 60 / (cols + 1);
  const yStep = 50 / (Math.ceil(total / cols) + 1);
  return {
    top: `${20 + yStep * (row + 1)}%`,
    left: `${20 + xStep * (col + 1)}%`,
  };
}

export function SearchScreen({ vendors, onOpenVendor }: SearchScreenProps) {
  const [activeVendorId, setActiveVendorId] = useState(vendors[0]?.id);
  const [query, setQuery] = useState('');

  const filtered = query
    ? vendors.filter(
        (v) =>
          v.name.includes(query) ||
          v.address.includes(query) ||
          v.amenities.some((a) => a.includes(query))
      )
    : vendors;

  const activeVendor =
    filtered.find((vendor) => vendor.id === activeVendorId) ?? filtered[0];

  return (
    <>
      <SearchBarWrap>
        <SearchBar>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            type="text"
            placeholder="업체명, 주소, 편의시설 검색"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveVendorId('');
            }}
          />
        </SearchBar>
      </SearchBarWrap>

      {filtered.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyText>검색 결과가 없습니다</EmptyText>
          <EmptySubText>다른 키워드로 검색해보세요</EmptySubText>
        </EmptyState>
      ) : (
        <>
          <SectionCard>
            <MapCanvas>
              <MapGrid />
              <MapRoad horizontal top="24%" />
              <MapRoad horizontal top="66%" />
              <MapRoad left="28%" />
              <MapRoad left="61%" />
              {filtered.map((vendor, index) => {
                const pos = getMarkerPosition(index, filtered.length);
                return (
                  <MarkerButton
                    key={vendor.id}
                    type="button"
                    active={vendor.id === activeVendor?.id}
                    top={pos.top}
                    left={pos.left}
                    onClick={() => setActiveVendorId(vendor.id)}
                  >
                    <MarkerDot active={vendor.id === activeVendor?.id} />
                    <MarkerLabel active={vendor.id === activeVendor?.id}>
                      {vendor.name}
                    </MarkerLabel>
                  </MarkerButton>
                );
              })}
              {activeVendor && (
                <MapOverlayCard type="button" onClick={() => onOpenVendor(activeVendor.id)}>
                  {activeVendor.imageUrl ? (
                    <OverlayThumb src={activeVendor.imageUrl} alt={activeVendor.name} />
                  ) : (
                    <OverlayThumbPlaceholder>🎵</OverlayThumbPlaceholder>
                  )}
                  <OverlayCopy>
                    <Badge size="small" variant="weak" color="blue">
                      추천
                    </Badge>
                    <OverlayTitle>{activeVendor.name}</OverlayTitle>
                    <OverlayMeta>
                      {activeVendor.address}
                    </OverlayMeta>
                  </OverlayCopy>
                </MapOverlayCard>
              )}
            </MapCanvas>
          </SectionCard>

          <SectionCard
            title="검색 결과"
            action={
              <CountLabel>
                <ListHeader.DescriptionParagraph>
                  {filtered.length}곳
                </ListHeader.DescriptionParagraph>
              </CountLabel>
            }
          >
            <Stack>
              {filtered.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onClick={() => onOpenVendor(vendor.id)}
                />
              ))}
            </Stack>
          </SectionCard>
        </>
      )}
    </>
  );
}

const MapCanvas = styled.div({
  position: 'relative',
  overflow: 'hidden',
  minHeight: '430px',
  borderRadius: '32px',
  background:
    'linear-gradient(180deg, rgba(241, 245, 249, 0.92) 0%, rgba(248, 250, 252, 1) 100%)',
  border: `1px solid ${colors.grey100}`,
});

const MapGrid = styled.div({
  position: 'absolute',
  inset: 0,
  backgroundImage:
    'linear-gradient(rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 1px)',
  backgroundSize: '32px 32px',
});

const MapRoad = styled.div<{
  horizontal?: boolean;
  top?: string;
  left?: string;
}>(({ horizontal, top, left }) => ({
  position: 'absolute',
  top,
  left,
  width: horizontal ? '100%' : '18px',
  height: horizontal ? '18px' : '100%',
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: 'inset 0 0 0 1px rgba(203, 213, 225, 0.55)',
}));

const MarkerButton = styled.button<{
  active: boolean;
  top: string;
  left: string;
}>(({ top, left }) => ({
  position: 'absolute',
  top,
  left,
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: 0,
  border: 0,
  background: 'transparent',
}));

const MarkerDot = styled.span<{ active: boolean }>(({ active }) => ({
  width: active ? '18px' : '14px',
  height: active ? '18px' : '14px',
  borderRadius: '999px',
  background: active ? colors.blue500 : colors.grey500,
  boxShadow: active
    ? '0 0 0 8px rgba(49, 130, 246, 0.16)'
    : '0 0 0 6px rgba(100, 116, 139, 0.10)',
}));

const MarkerLabel = styled.span<{ active: boolean }>(({ active }) => ({
  padding: '8px 12px',
  borderRadius: '999px',
  background: active ? colors.blue500 : 'rgba(255, 255, 255, 0.96)',
  color: active ? colors.white : colors.grey700,
  fontSize: '13px',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.10)',
}));

const MapOverlayCard = styled.button({
  position: 'absolute',
  right: '16px',
  bottom: '16px',
  left: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px',
  border: 0,
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.94)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  textAlign: 'left',
  boxShadow: '0 16px 30px rgba(15, 23, 42, 0.10)',
});

const OverlayThumb = styled.img({
  width: '72px',
  height: '72px',
  borderRadius: '18px',
  objectFit: 'cover',
  flexShrink: 0,
});

const OverlayThumbPlaceholder = styled.div({
  width: '72px',
  height: '72px',
  borderRadius: '18px',
  background: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '28px',
  flexShrink: 0,
});

const OverlayCopy = styled.div({
  minWidth: 0,
});

const OverlayTitle = styled.strong({
  display: 'block',
  marginTop: '8px',
  fontSize: '17px',
  lineHeight: 1.35,
  color: colors.grey900,
});

const OverlayMeta = styled.p({
  margin: '4px 0 0',
  color: colors.grey600,
  fontSize: '13px',
  lineHeight: 1.45,
});

const CountLabel = styled.div({
  color: colors.grey600,
});

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: 0,
});

const SearchBarWrap = styled.div({
  padding: '0 20px 16px',
});

const SearchBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '11px 16px',
  border: `1px solid ${colors.grey100}`,
  borderRadius: '16px',
  background: colors.grey50,
});

const SearchIcon = styled(FontAwesomeIcon)({
  fontSize: '15px',
  color: colors.grey500,
});

const SearchInput = styled.input({
  flex: 1,
  border: 0,
  background: 'transparent',
  fontSize: '15px',
  lineHeight: 1.4,
  outline: 'none',
  color: colors.grey900,
  '::placeholder': {
    color: colors.grey500,
  },
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
