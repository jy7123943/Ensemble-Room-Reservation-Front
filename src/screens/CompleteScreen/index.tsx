import { Asset, Button, FixedBottomCTA, Result } from '@toss/tds-mobile';

interface CompleteScreenProps {
  onViewReservation: () => void;
  onGoHome: () => void;
}

export function CompleteScreen({
  onViewReservation,
  onGoHome,
}: CompleteScreenProps) {
  return (
    <>
      <Result
        figure={<Asset.Text frameShape={{ width: 64, height: 64 }}>✓</Asset.Text>}
        title="예약이 완료되었어요"
        description="예약번호: R-20260315-A7K2\n사운드박스 합주실 · A룸\n2026.03.15 12:00 - 14:00"
      />
      <FixedBottomCTA.Double
        leftButton={
          <Button size="large" variant="weak" onClick={onGoHome}>
            홈으로 가기
          </Button>
        }
        rightButton={
          <Button size="large" onClick={onViewReservation}>
            예약 상세 보기
          </Button>
        }
      />
    </>
  );
}
