import styled from '@emotion/styled';
import { Button, SegmentedControl } from '@toss/tds-mobile';
import type { Reservation } from '../../types';
import { SectionCard } from '../../components/SectionCard';

interface ReservationsScreenProps {
  reservations: Reservation[];
  onOpenDetail: () => void;
  onOpenReview: () => void;
}

export function ReservationsScreen({
  reservations,
  onOpenDetail,
  onOpenReview,
}: ReservationsScreenProps) {
  return (
    <>
      <SectionCard>
        <SegmentedControl defaultValue="upcoming" size="small">
          <SegmentedControl.Item value="upcoming">예정</SegmentedControl.Item>
          <SegmentedControl.Item value="done">완료</SegmentedControl.Item>
          <SegmentedControl.Item value="cancelled">취소</SegmentedControl.Item>
        </SegmentedControl>
      </SectionCard>
      <SectionCard title="내 예약">
        <Stack>
          {reservations.map((item) => (
            <RoomCard key={item.id}>
              <div>
                <strong>{item.vendorName}</strong>
                <MutedParagraph>{item.roomName}</MutedParagraph>
                <MutedParagraph>{item.dateLabel} · {item.timeLabel}</MutedParagraph>
              </div>
              {item.status === 'completed' ? (
                <Button size="small" variant="weak" onClick={onOpenReview}>
                  리뷰 작성
                </Button>
              ) : (
                <Button size="small" onClick={onOpenDetail}>
                  상세보기
                </Button>
              )}
            </RoomCard>
          ))}
        </Stack>
      </SectionCard>
    </>
  );
}

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const RoomCard = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '14px',
  borderRadius: '18px',
  background: '#f8fafc',
});

const MutedParagraph = styled.p({
  margin: '4px 0',
  color: '#64748b',
});
