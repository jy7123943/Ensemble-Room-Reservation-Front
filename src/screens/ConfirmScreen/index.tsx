import styled from '@emotion/styled';
import { Button, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

interface ConfirmScreenProps {
  onPay: () => void;
}

export function ConfirmScreen({ onPay }: ConfirmScreenProps) {
  return (
    <>
      <SectionCard title="예약 정보">
        <DetailList>
          <DetailRow><span>업체</span><strong>사운드박스 합주실</strong></DetailRow>
          <DetailRow><span>룸</span><strong>A룸</strong></DetailRow>
          <DetailRow><span>일시</span><strong>2026.03.15 12:00 - 14:00</strong></DetailRow>
        </DetailList>
      </SectionCard>

      <SectionCard title="요청사항">
        <TextArea variant="box" defaultValue="4명 / 마이크 2개 요청" minHeight={120} />
      </SectionCard>

      <SectionCard title="결제 예정 금액">
        <DetailList>
          <DetailRow><span>이용 금액</span><strong>30,000원</strong></DetailRow>
          <DetailRow><span>총 결제 금액</span><strong>30,000원</strong></DetailRow>
        </DetailList>
      </SectionCard>

      <StickyCta>
        <Button size="xlarge" display="full" onClick={onPay}>
          토스페이 결제
        </Button>
      </StickyCta>
    </>
  );
}

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
});
