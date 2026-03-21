interface CompleteScreenProps {
  onViewReservation: () => void;
  onGoHome: () => void;
}

export function CompleteScreen({
  onViewReservation,
  onGoHome,
}: CompleteScreenProps) {
  return (
    <section className="complete-card">
      <div className="complete-icon">✓</div>
      <h2>예약이 완료되었어요</h2>
      <p>예약번호: R-20260315-A7K2</p>
      <p>사운드박스 합주실 · A룸</p>
      <p>2026.03.15 12:00 - 14:00</p>
      <div className="stack">
        <button type="button" className="primary-button" onClick={onViewReservation}>
          예약 상세 보기
        </button>
        <button type="button" className="secondary-button" onClick={onGoHome}>
          홈으로 가기
        </button>
      </div>
    </section>
  );
}
