import styled from '@emotion/styled';
import { Button, ListRow, SegmentedControl } from '@toss/tds-mobile';
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
            <ListRow
              key={item.id}
              border="none"
              withTouchEffect
              onClick={item.status === 'completed' ? onOpenReview : onOpenDetail}
              contents={
                <ListRow.Texts
                  type="3RowTypeA"
                  top={item.vendorName}
                  middle={item.roomName}
                  bottom={`${item.dateLabel} · ${item.timeLabel}`}
                />
              }
              right={
                item.status === 'completed' ? (
                  <Button size="small" variant="weak" onClick={onOpenReview}>
                    리뷰 작성
                  </Button>
                ) : (
                  <Button size="small" onClick={onOpenDetail}>
                    상세보기
                  </Button>
                )
              }
            />
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
  padding: 0,
});
