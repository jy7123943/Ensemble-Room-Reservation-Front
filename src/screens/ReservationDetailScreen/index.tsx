import styled from '@emotion/styled';
import { Badge, Button, FixedBottomCTA, ListRow } from '@toss/tds-mobile';
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
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="예약번호" />} right={<ListRow.Texts type="Right1RowTypeA" top={reservation.id} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="업체" />} right={<ListRow.Texts type="Right1RowTypeA" top={reservation.vendorName} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="룸" />} right={<ListRow.Texts type="Right1RowTypeA" top={reservation.roomName} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="일시" />} right={<ListRow.Texts type="Right1RowTypeA" top={`${reservation.dateLabel} ${reservation.timeLabel}`} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="결제 금액" />} right={<ListRow.Texts type="Right1RowTypeA" top={reservation.priceLabel} />} />
      </SectionCard>

      <SectionCard title="취소 규정">
        <PlainList>
          <li>24시간 전 취소: 전액 환불</li>
          <li>12~24시간 전 취소: 50% 환불</li>
          <li>12시간 이내 취소: 환불 불가</li>
        </PlainList>
      </SectionCard>

      <FixedBottomCTA.Double
        leftButton={
          <Button size="large" variant="weak">
            업체에 전화
          </Button>
        }
        rightButton={
          reservation.status === 'completed' ? (
            <Button size="large" onClick={onWriteReview}>
              리뷰 작성
            </Button>
          ) : (
            <Button size="large">
              예약 취소
            </Button>
          )
        }
      />
    </>
  );
}

const StatusPillWrap = styled.div({
  marginBottom: '14px',
});

const PlainList = styled.ul({
  margin: 0,
  paddingLeft: '18px',
  color: '#475569',
  lineHeight: 1.7,
});
