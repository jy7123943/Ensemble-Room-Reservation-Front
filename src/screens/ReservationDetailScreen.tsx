import { Badge, Button } from '@toss/tds-mobile';
import type { Reservation } from '../types';
import { SectionCard } from '../components/SectionCard';

interface ReservationDetailScreenProps {
  reservation: Reservation;
  onWriteReview: () => void;
}

export function ReservationDetailScreen({
  reservation,
  onWriteReview,
}: ReservationDetailScreenProps) {
  return (
    <>
      <SectionCard>
        <div className="status-pill">
          <Badge size="medium" variant="weak" color="blue">
          {reservation.status === 'confirmed' ? '예약 확정' : '이용 완료'}
          </Badge>
        </div>
        <div className="detail-list">
          <div><span>예약번호</span><strong>{reservation.id}</strong></div>
          <div><span>업체</span><strong>{reservation.vendorName}</strong></div>
          <div><span>룸</span><strong>{reservation.roomName}</strong></div>
          <div><span>일시</span><strong>{reservation.dateLabel} {reservation.timeLabel}</strong></div>
          <div><span>결제 금액</span><strong>{reservation.priceLabel}</strong></div>
        </div>
      </SectionCard>

      <SectionCard title="취소 규정">
        <ul className="plain-list">
          <li>24시간 전 취소: 전액 환불</li>
          <li>12~24시간 전 취소: 50% 환불</li>
          <li>12시간 이내 취소: 환불 불가</li>
        </ul>
      </SectionCard>

      <div className="sticky-cta split">
        <Button size="large" variant="weak" display="block">
          업체에 전화
        </Button>
        {reservation.status === 'completed' ? (
          <Button size="large" display="block" onClick={onWriteReview}>
            리뷰 작성
          </Button>
        ) : (
          <Button size="large" display="block">
            예약 취소
          </Button>
        )}
      </div>
    </>
  );
}
