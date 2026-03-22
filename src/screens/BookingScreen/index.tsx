import styled from '@emotion/styled';
import { Button, FixedBottomCTA, ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';
import type { Room, TimeSlot } from '../../types';

interface BookingScreenProps {
  room: Room;
  slots: TimeSlot[];
  dates: { value: string; label: string }[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedSlots: string[];
  onSlotToggle: (startTime: string) => void;
  hourlyPrice: number;
  onNext: () => void;
}

export function BookingScreen({
  room,
  slots,
  dates,
  selectedDate,
  onDateChange,
  selectedSlots,
  onSlotToggle,
  hourlyPrice,
  onNext,
}: BookingScreenProps) {
  const sortedSelected = [...selectedSlots].sort();
  const durationHours = selectedSlots.length;
  const totalPrice = durationHours * hourlyPrice;

  const timeRangeLabel =
    sortedSelected.length > 0
      ? (() => {
          const first = sortedSelected[0];
          const lastSlot = slots.find((s) => s.start === sortedSelected[sortedSelected.length - 1]);
          const end = lastSlot?.end ?? '';
          return `${first.slice(0, 5)} - ${end.slice(0, 5)}`;
        })()
      : '';

  return (
    <>
      <SectionCard>
        <ListRow
          border="none"
          contents={
            <ListRow.Texts
              type="3RowTypeA"
              top={room.name}
              middle={`${room.capacity}인 · ${room.price.toLocaleString('ko-KR')}원/시간`}
              bottom={room.equipment.join(', ')}
            />
          }
        />
      </SectionCard>

      <SectionCard title="날짜 선택">
        <ChipRow>
          {dates.map((d) => (
            <Button
              key={d.value}
              size="small"
              variant={d.value === selectedDate ? 'fill' : 'weak'}
              onClick={() => onDateChange(d.value)}
            >
              {d.label}
            </Button>
          ))}
        </ChipRow>
      </SectionCard>

      <SectionCard title="시간 선택">
        <SlotGrid>
          {slots.map((slot) => {
            const isSelected = selectedSlots.includes(slot.start);
            return (
              <SlotButton
                key={slot.label}
                type="button"
                available={slot.available}
                selected={isSelected}
                disabled={!slot.available}
                onClick={() => slot.available && onSlotToggle(slot.start)}
              >
                {slot.label}
              </SlotButton>
            );
          })}
        </SlotGrid>
        {selectedSlots.length > 0 && (
          <ListRow
            border="none"
            horizontalPadding="small"
            contents={
              <ListRow.Texts
                type="1RowTypeB"
                top={`선택: ${timeRangeLabel} (${durationHours}시간)`}
              />
            }
            right={
              <ListRow.Texts
                type="Right1RowTypeA"
                top={`${totalPrice.toLocaleString('ko-KR')}원`}
              />
            }
          />
        )}
      </SectionCard>

      <FixedBottomCTA onClick={onNext} disabled={selectedSlots.length === 0}>
        다음으로
      </FixedBottomCTA>
    </>
  );
}

const ChipRow = styled.div({
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  marginTop: '12px',
});

const SlotGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: '10px',
});

const SlotButton = styled.button<{ available: boolean; selected: boolean }>(
  ({ available, selected }) => ({
    border: 0,
    borderRadius: '16px',
    padding: '14px 8px',
    fontWeight: 700,
    cursor: available ? 'pointer' : 'default',
    background: !available ? '#e5e7eb' : selected ? '#0369a1' : '#e0f2fe',
    color: !available ? '#94a3b8' : selected ? '#ffffff' : '#075985',
  }),
);
