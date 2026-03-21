import styled from '@emotion/styled';
import { Badge, Button } from '@toss/tds-mobile';
import type { Reservation } from '../../types';
import { SectionCard } from '../../components/SectionCard';

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
        <StatusPillWrap>
          <Badge size="medium" variant="weak" color="blue">
            {reservation.status === 'confirmed' ? '예약 확정' : '이용 완료'}
          </Badge>
        </StatusPillWrap>
        <DetailList>
          <DetailRow><span>예약번호</span><strong>{reservation.id}</strong></DetailRow>
          <DetailRow><span>업체</span><strong>{reservation.vendorName}</strong></DetailRow>
          <DetailRow><span>룸</span><strong>{reservation.roomName}</strong></DetailRow>
          <DetailRow><span>일시</span><strong>{reservation.dateLabel} {reservation.timeLabel}</strong></DetailRow>
          <DetailRow><span>결제 금액</span><strong>{reservation.priceLabel}</strong></DetailRow>
        </DetailList>
      </SectionCard>

      <SectionCard title="취소 규정">
        <PlainList>
          <li>24시간 전 취소: 전액 환불</li>
          <li>12~24시간 전 취소: 50% 환불</li>
          <li>12시간 이내 취소: 환불 불가</li>
        </PlainList>
      </SectionCard>

      <StickyCta>
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
      </StickyCta>
    </>
  );
}

const StatusPillWrap = styled.div({
  marginBottom: '14px',
});

const DetailList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const DetailRow = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  '& span': {
    color: '#64748b',
  },
});

const PlainList = styled.ul({
  margin: 0,
  paddingLeft: '18px',
  color: '#475569',
  lineHeight: 1.7,
});

const StickyCta = styled.div({
  position: 'sticky',
  bottom: '16px',
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
  padding: '14px',
  borderRadius: '22px',
  background: 'rgba(255, 255, 255, 0.94)',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
  '& > *': {
    flex: 1,
  },
});
