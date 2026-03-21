import { SectionCard } from '../components/SectionCard';
import type { Room } from '../types';

interface BookingScreenProps {
  room: Room;
  slots: Array<{ label: string; available: boolean; discounted?: boolean }>;
  onNext: () => void;
}

export function BookingScreen({ room, slots, onNext }: BookingScreenProps) {
  return (
    <>
      <SectionCard>
        <div className="room-card-simple">
          <strong>{room.name}</strong>
          <p>{room.capacity}인 · {room.price.toLocaleString('ko-KR')}원/시간</p>
          <p>{room.equipment.join(', ')}</p>
        </div>
      </SectionCard>

      <SectionCard title="날짜 선택">
        <div className="chip-row">
          <span className="date-pill date-pill-active">3/15</span>
          <span className="date-pill">3/16</span>
          <span className="date-pill">3/17</span>
        </div>
      </SectionCard>

      <SectionCard title="시간 선택">
        <div className="slot-grid">
          {slots.map((slot) => (
            <button
              key={slot.label}
              type="button"
              className={[
                'slot-button',
                slot.available ? '' : 'slot-button-disabled',
                slot.discounted ? 'slot-button-discount' : '',
              ].join(' ')}
            >
              {slot.label}
            </button>
          ))}
        </div>
        <div className="selection-summary">
          <span>선택: 12:00 - 14:00</span>
          <strong>30,000원</strong>
        </div>
      </SectionCard>

      <div className="sticky-cta">
        <button type="button" className="primary-button" onClick={onNext}>
          다음으로
        </button>
      </div>
    </>
  );
}
