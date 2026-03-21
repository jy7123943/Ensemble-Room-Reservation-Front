import styled from '@emotion/styled';
import { Button } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';
import type { Room } from '../../types';

interface BookingScreenProps {
  room: Room;
  slots: Array<{ label: string; available: boolean; discounted?: boolean }>;
  onNext: () => void;
}

export function BookingScreen({ room, slots, onNext }: BookingScreenProps) {
  return (
    <>
      <SectionCard>
        <RoomCardSimple>
          <strong>{room.name}</strong>
          <p>{room.capacity}인 · {room.price.toLocaleString('ko-KR')}원/시간</p>
          <p>{room.equipment.join(', ')}</p>
        </RoomCardSimple>
      </SectionCard>

      <SectionCard title="날짜 선택">
        <ChipRow>
          <DatePill active>3/15</DatePill>
          <DatePill>3/16</DatePill>
          <DatePill>3/17</DatePill>
        </ChipRow>
      </SectionCard>

      <SectionCard title="시간 선택">
        <SlotGrid>
          {slots.map((slot) => (
            <SlotButton key={slot.label} type="button" available={slot.available} discounted={slot.discounted}>
              {slot.label}
            </SlotButton>
          ))}
        </SlotGrid>
        <SelectionSummary>
          <span>선택: 12:00 - 14:00</span>
          <strong>30,000원</strong>
        </SelectionSummary>
      </SectionCard>

      <StickyCta>
        <Button size="xlarge" display="full" onClick={onNext}>
          다음으로
        </Button>
      </StickyCta>
    </>
  );
}

const RoomCardSimple = styled.div({
  '& p': {
    margin: '4px 0',
    color: '#64748b',
  },
});

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

const DatePill = styled.span<{ active?: boolean }>(({ active }) => ({
  display: 'inline-flex',
  minWidth: '58px',
  justifyContent: 'center',
  padding: '10px 14px',
  borderRadius: '14px',
  background: active ? '#1d4ed8' : '#edf2f7',
  color: active ? '#fff' : '#475569',
}));

const SlotGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '10px',
});

const SlotButton = styled.button<{ available: boolean; discounted?: boolean }>(
  ({ available, discounted }) => ({
    border: 0,
    borderRadius: '16px',
    padding: '14px 8px',
    fontWeight: 700,
    background: !available ? '#e5e7eb' : discounted ? '#dcfce7' : '#e0f2fe',
    color: !available ? '#94a3b8' : discounted ? '#15803d' : '#075985',
  }),
);

const SelectionSummary = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
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
