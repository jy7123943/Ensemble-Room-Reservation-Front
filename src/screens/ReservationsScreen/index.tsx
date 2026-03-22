import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '@toss/tds-colors';
import { Button, ListRow, SegmentedControl } from '@toss/tds-mobile';
import type { Reservation } from '../../types';
import { SectionCard } from '../../components/SectionCard';

type TabValue = 'upcoming' | 'done' | 'cancelled';

interface ReservationsScreenProps {
  reservations: Reservation[];
  onOpenDetail: (reservationId: string) => void;
  onOpenReview: (reservationId: string) => void;
}

function filterReservations(reservations: Reservation[], tab: TabValue): Reservation[] {
  switch (tab) {
    case 'upcoming':
      return reservations.filter((r) => r.status === 'pending' || r.status === 'confirmed');
    case 'done':
      return reservations.filter((r) => r.status === 'completed');
    case 'cancelled':
      return reservations.filter((r) => r.status === 'cancelled');
  }
}

export function ReservationsScreen({
  reservations,
  onOpenDetail,
  onOpenReview,
}: ReservationsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabValue>('upcoming');

  const filtered = filterReservations(reservations, activeTab);

  return (
    <>
      <SectionCard>
        <SegmentedControl
          defaultValue="upcoming"
          size="small"
          onChange={(value: string) => setActiveTab(value as TabValue)}
        >
          <SegmentedControl.Item value="upcoming">예정</SegmentedControl.Item>
          <SegmentedControl.Item value="done">완료</SegmentedControl.Item>
          <SegmentedControl.Item value="cancelled">취소</SegmentedControl.Item>
        </SegmentedControl>
      </SectionCard>
      <SectionCard title="내 예약">
        {filtered.length === 0 ? (
          <EmptyState>
            <EmptyText>예약 내역이 없습니다</EmptyText>
          </EmptyState>
        ) : (
          <Stack>
            {filtered.map((item) => (
              <ListRow
                key={item.id}
                border="none"
                withTouchEffect
                onClick={() => onOpenDetail(item.id)}
                left={
                  <ListRow.AssetImage
                    src={item.imageUrl}
                    shape="square"
                    size="medium"
                  />
                }
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
                    item.hasReview ? (
                      <Button size="small" variant="weak" disabled>
                        리뷰 완료
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="weak"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onOpenReview(item.id);
                        }}
                      >
                        리뷰 작성
                      </Button>
                    )
                  ) : (
                    <Button size="small" onClick={() => onOpenDetail(item.id)}>
                      상세보기
                    </Button>
                  )
                }
              />
            ))}
          </Stack>
        )}
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

const EmptyState = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 20px',
  textAlign: 'center',
});

const EmptyText = styled.p({
  margin: 0,
  fontSize: '15px',
  color: colors.grey500,
});
