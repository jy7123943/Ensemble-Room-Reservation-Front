import { Button, SegmentedControl } from '@toss/tds-mobile';
import type { Reservation } from '../types';
import { SectionCard } from '../components/SectionCard';

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
        <div className="stack">
          {reservations.map((item) => (
            <div key={item.id} className="reservation-card">
              <div>
                <strong>{item.vendorName}</strong>
                <p>{item.roomName}</p>
                <p>{item.dateLabel} · {item.timeLabel}</p>
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
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
