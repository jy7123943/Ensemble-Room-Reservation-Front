import { FixedBottomCTA, ListRow, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

interface ConfirmScreenProps {
  vendorName: string;
  roomName: string;
  dateLabel: string;
  timeLabel: string;
  totalPrice: number;
  userMemo: string;
  onMemoChange: (memo: string) => void;
  onPay: () => void;
  isLoading: boolean;
}

export function ConfirmScreen({
  vendorName,
  roomName,
  dateLabel,
  timeLabel,
  totalPrice,
  userMemo,
  onMemoChange,
  onPay,
  isLoading,
}: ConfirmScreenProps) {
  const priceLabel = `${totalPrice.toLocaleString('ko-KR')}원`;

  return (
    <>
      <SectionCard title="예약 정보">
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="업체" />} right={<ListRow.Texts type="Right1RowTypeA" top={vendorName} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="룸" />} right={<ListRow.Texts type="Right1RowTypeA" top={roomName} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="일시" />} right={<ListRow.Texts type="Right1RowTypeA" top={`${dateLabel} ${timeLabel}`} />} />
      </SectionCard>

      <SectionCard title="요청사항">
        <TextArea
          variant="box"
          value={userMemo}
          onChange={(e) => onMemoChange(e.target.value)}
          placeholder="요청사항을 입력하세요 (예: 4명 / 마이크 2개 요청)"
          minHeight={120}
        />
      </SectionCard>

      <SectionCard title="결제 예정 금액">
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="이용 금액" />} right={<ListRow.Texts type="Right1RowTypeA" top={priceLabel} />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="총 결제 금액" />} right={<ListRow.Texts type="Right1RowTypeA" top={priceLabel} />} />
      </SectionCard>

      <FixedBottomCTA onClick={onPay} disabled={isLoading}>
        {isLoading ? '결제 처리 중...' : '토스페이 결제'}
      </FixedBottomCTA>
    </>
  );
}
