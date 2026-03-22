import styled from '@emotion/styled';
import { Badge, Button, ListRow } from '@toss/tds-mobile';
import type { Room, Vendor } from '../../types';
import { SectionCard } from '../../components/SectionCard';

interface VendorDetailScreenProps {
  vendor: Vendor;
  rooms: Room[];
  onOpenBooking: (roomId: string) => void;
}

export function VendorDetailScreen({
  vendor,
  rooms,
  onOpenBooking,
}: VendorDetailScreenProps) {
  return (
    <>
      <HeroImage src={vendor.imageUrl} alt={vendor.name} />
      <SectionCard>
        <VendorTitleRow>
          <div>
            <PageSectionTitle>{vendor.name}</PageSectionTitle>
            <MutedParagraph>★ {vendor.rating} ({vendor.reviewCount})</MutedParagraph>
            <MutedParagraph>{vendor.address}</MutedParagraph>
            <MutedParagraph>09:00 - 23:00</MutedParagraph>
          </div>
          <GhostIconButton type="button">♡</GhostIconButton>
        </VendorTitleRow>
        <ChipRow>
          {vendor.amenities.map((item) => (
            <Badge key={item} size="small" variant="weak" color="blue">
              {item}
            </Badge>
          ))}
        </ChipRow>
      </SectionCard>

      <SectionCard title="룸 목록">
        <Stack>
          {rooms.map((room) => (
            <ListRow
              key={room.id}
              border="none"
              contents={
                <ListRow.Texts
                  type="3RowTypeA"
                  top={room.name}
                  middle={`${room.capacity}인`}
                  bottom={`${room.price.toLocaleString('ko-KR')}원/시간`}
                />
              }
              right={
                <Button size="small" onClick={() => onOpenBooking(room.id)}>
                  예약
                </Button>
              }
            />
          ))}
        </Stack>
      </SectionCard>
    </>
  );
}

const HeroImage = styled.img({
  display: 'block',
  width: '100%',
  height: '220px',
  objectFit: 'cover',
});

const VendorTitleRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
});

const PageSectionTitle = styled.h2({
  margin: 0,
  fontSize: '18px',
});

const MutedParagraph = styled.p({
  margin: '4px 0',
  color: '#64748b',
});

const GhostIconButton = styled.button({
  border: 0,
  width: '40px',
  height: '40px',
  borderRadius: '999px',
  background: '#eff6ff',
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
  padding: 0,
});
