import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';
import type { Reservation } from '../../types';

interface PaymentHistoryScreenProps {
  reservations: Reservation[];
  onBack: () => void;
}

export function PaymentHistoryScreen({ reservations, onBack }: PaymentHistoryScreenProps) {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>&larr;</BackButton>
        <Title>결제 내역</Title>
      </Header>

      {reservations.length === 0 ? (
        <EmptyMessage>결제 내역이 없습니다.</EmptyMessage>
      ) : (
        <PaymentList>
          {reservations.map((r) => (
            <ListRow
              key={r.id}
              border="none"
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top={`${r.vendorName} - ${r.roomName}`}
                  bottom={`${r.dateLabel} ${r.timeLabel}`}
                />
              }
              right={<Price>{r.priceLabel}</Price>}
            />
          ))}
        </PaymentList>
      )}
    </Container>
  );
}

const Container = styled.div({ padding: '0 20px' });

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '20px 0',
});

const BackButton = styled.button({
  background: 'none',
  border: 'none',
  fontSize: 20,
  cursor: 'pointer',
  padding: '4px 8px',
});

const Title = styled.h2({
  fontSize: 18,
  fontWeight: 700,
  margin: 0,
});

const PaymentList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Price = styled.span({
  fontSize: 15,
  fontWeight: 600,
  color: colors.blue500,
  whiteSpace: 'nowrap',
});

const EmptyMessage = styled.p({
  textAlign: 'center',
  padding: 40,
  color: colors.grey500,
});
