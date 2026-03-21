import styled from '@emotion/styled';
import { Button } from '@toss/tds-mobile';

interface CompleteScreenProps {
  onViewReservation: () => void;
  onGoHome: () => void;
}

export function CompleteScreen({
  onViewReservation,
  onGoHome,
}: CompleteScreenProps) {
  return (
    <CompleteCard>
      <CompleteIcon>✓</CompleteIcon>
      <h2>예약이 완료되었어요</h2>
      <p>예약번호: R-20260315-A7K2</p>
      <p>사운드박스 합주실 · A룸</p>
      <p>2026.03.15 12:00 - 14:00</p>
      <Stack>
        <Button size="xlarge" display="full" onClick={onViewReservation}>
          예약 상세 보기
        </Button>
        <Button size="xlarge" display="full" variant="weak" onClick={onGoHome}>
          홈으로 가기
        </Button>
      </Stack>
    </CompleteCard>
  );
}

const CompleteCard = styled.section({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '10px',
  padding: '32px 20px',
  borderRadius: '28px',
  background: 'linear-gradient(180deg, #ffffff, #eff6ff)',
  '& p': {
    margin: '4px 0',
    color: '#64748b',
  },
});

const CompleteIcon = styled.div({
  display: 'grid',
  placeItems: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '999px',
  background: '#dbeafe',
  color: '#1d4ed8',
  fontSize: '28px',
  fontWeight: 800,
});

const Stack = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
});
