import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '@toss/tds-colors';
import { Badge, ListHeader } from '@toss/tds-mobile';
import type { Vendor } from '../../types';
import { SectionCard } from '../../components/SectionCard';
import { VendorCard } from '../../components/VendorCard';

interface SearchScreenProps {
  vendors: Vendor[];
  onOpenVendor: (vendorId: string) => void;
}

export function SearchScreen({ vendors, onOpenVendor }: SearchScreenProps) {
  const [activeVendorId, setActiveVendorId] = useState(vendors[0]?.id);
  const activeVendor =
    vendors.find((vendor) => vendor.id === activeVendorId) ?? vendors[0];

  return (
    <>
      <SectionCard>
        <MapCanvas>
          <MapGrid />
          <MapRoad horizontal top="24%" />
          <MapRoad horizontal top="66%" />
          <MapRoad left="28%" />
          <MapRoad left="61%" />
          {vendors.map((vendor, index) => (
            <MarkerButton
              key={vendor.id}
              type="button"
              active={vendor.id === activeVendor.id}
              top={index === 0 ? '34%' : '56%'}
              left={index === 0 ? '37%' : '64%'}
              onClick={() => setActiveVendorId(vendor.id)}
            >
              <MarkerDot active={vendor.id === activeVendor.id} />
              <MarkerLabel active={vendor.id === activeVendor.id}>
                {vendor.name}
              </MarkerLabel>
            </MarkerButton>
          ))}
          <MapOverlayCard type="button" onClick={() => onOpenVendor(activeVendor.id)}>
            <OverlayThumb src={activeVendor.imageUrl} alt={activeVendor.name} />
            <OverlayCopy>
              <Badge size="small" variant="weak" color="blue">
                가까운 순 추천
              </Badge>
              <OverlayTitle>{activeVendor.name}</OverlayTitle>
              <OverlayMeta>
                {activeVendor.distance} · ★ {activeVendor.rating} · {activeVendor.priceLabel}
              </OverlayMeta>
            </OverlayCopy>
          </MapOverlayCard>
        </MapCanvas>
      </SectionCard>

      <SectionCard
        title="가까운 순 결과"
        action={
          <CountLabel>
            <ListHeader.DescriptionParagraph>
              {vendors.length}곳
            </ListHeader.DescriptionParagraph>
          </CountLabel>
        }
      >
        <Stack>
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onClick={() => onOpenVendor(vendor.id)}
            />
          ))}
        </Stack>
      </SectionCard>
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
