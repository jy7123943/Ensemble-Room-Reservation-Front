import { FixedBottomCTA, ListRow, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

interface ConfirmScreenProps {
  onPay: () => void;
}

export function ConfirmScreen({ onPay }: ConfirmScreenProps) {
  return (
    <>
      <SectionCard title="예약 정보">
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="업체" />} right={<ListRow.Texts type="Right1RowTypeA" top="사운드박스 합주실" />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="룸" />} right={<ListRow.Texts type="Right1RowTypeA" top="A룸" />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="일시" />} right={<ListRow.Texts type="Right1RowTypeA" top="2026.03.15 12:00 - 14:00" />} />
      </SectionCard>

      <SectionCard title="요청사항">
        <TextArea variant="box" defaultValue="4명 / 마이크 2개 요청" minHeight={120} />
      </SectionCard>

      <SectionCard title="결제 예정 금액">
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="이용 금액" />} right={<ListRow.Texts type="Right1RowTypeA" top="30,000원" />} />
        <ListRow border="none" horizontalPadding="small" contents={<ListRow.Texts type="1RowTypeB" top="총 결제 금액" />} right={<ListRow.Texts type="Right1RowTypeA" top="30,000원" />} />
      </SectionCard>

      <FixedBottomCTA onClick={onPay}>토스페이 결제</FixedBottomCTA>
    </>
  );
}
