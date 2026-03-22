import { Asset, Button, FixedBottomCTA, Result } from '@toss/tds-mobile';

interface CompleteScreenProps {
  reservationNumber: string;
  vendorName: string;
  roomName: string;
  dateLabel: string;
  timeLabel: string;
  onViewReservation: () => void;
  onGoHome: () => void;
}

export function CompleteScreen({
  reservationNumber,
  vendorName,
  roomName,
  dateLabel,
  timeLabel,
  onViewReservation,
  onGoHome,
}: CompleteScreenProps) {
  return (
    <>
      <Result
        figure={<Asset.Text frameShape={{ width: 64, height: 64 }}>✓</Asset.Text>}
        title="예약이 완료되었어요"
        description={`예약번호: ${reservationNumber}\n${vendorName} · ${roomName}\n${dateLabel} ${timeLabel}`}
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
