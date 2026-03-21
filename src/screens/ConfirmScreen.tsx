import { Button, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../components/SectionCard';

interface ConfirmScreenProps {
  onPay: () => void;
}

export function ConfirmScreen({ onPay }: ConfirmScreenProps) {
  return (
    <>
      <SectionCard title="예약 정보">
        <div className="detail-list">
          <div><span>업체</span><strong>사운드박스 합주실</strong></div>
          <div><span>룸</span><strong>A룸</strong></div>
          <div><span>일시</span><strong>2026.03.15 12:00 - 14:00</strong></div>
        </div>
      </SectionCard>

      <SectionCard title="요청사항">
        <TextArea variant="box" defaultValue="4명 / 마이크 2개 요청" minHeight={120} />
      </SectionCard>

      <SectionCard title="결제 예정 금액">
        <div className="detail-list">
          <div><span>이용 금액</span><strong>30,000원</strong></div>
          <div><span>총 결제 금액</span><strong>30,000원</strong></div>
        </div>
      </SectionCard>

      <div className="sticky-cta">
        <Button size="xlarge" display="full" onClick={onPay}>
          토스페이 결제
        </Button>
      </div>
    </>
  );
}
