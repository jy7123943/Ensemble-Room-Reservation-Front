import styled from '@emotion/styled';
import { Button, FixedBottomCTA, ListRow } from '@toss/tds-mobile';
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
          <Button size="small">3/15</Button>
          <Button size="small" variant="weak">3/16</Button>
          <Button size="small" variant="weak">3/17</Button>
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
        <ListRow
          border="none"
          horizontalPadding="small"
          contents={<ListRow.Texts type="1RowTypeB" top="선택: 12:00 - 14:00" />}
          right={<ListRow.Texts type="Right1RowTypeA" top="30,000원" />}
        />
      </SectionCard>

      <FixedBottomCTA onClick={onNext}>다음으로</FixedBottomCTA>
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
