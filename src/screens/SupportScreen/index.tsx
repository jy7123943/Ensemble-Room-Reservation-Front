import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

interface SupportScreenProps {
  onBack: () => void;
}

const faqs = [
  {
    q: '예약 취소는 어떻게 하나요?',
    a: '예약 내역에서 해당 예약을 선택한 후 "예약 취소" 버튼을 눌러주세요.',
  },
  {
    q: '환불은 언제 처리되나요?',
    a: '예약 취소 후 영업일 기준 3~5일 이내에 환불 처리됩니다.',
  },
  {
    q: '예약 시간 변경이 가능한가요?',
    a: '기존 예약을 취소하고 새로 예약해주세요.',
  },
  {
    q: '합주실 장비는 어떤 것이 있나요?',
    a: '각 합주실 상세 페이지에서 보유 장비를 확인하실 수 있습니다.',
  },
];

export function SupportScreen({ onBack }: SupportScreenProps) {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>&larr;</BackButton>
        <Title>고객센터</Title>
      </Header>

      <SectionCard title="자주 묻는 질문">
        {faqs.map((faq, i) => (
          <FaqItem key={i}>
            <ListRow
              border="none"
              contents={
                <ListRow.Texts
                  type="2RowTypeA"
                  top={`Q. ${faq.q}`}
                  bottom={`A. ${faq.a}`}
                />
              }
            />
          </FaqItem>
        ))}
      </SectionCard>

      <SectionCard title="문의하기">
        <ContactList>
          <ListRow
            border="none"
            contents={<ListRow.Texts type="2RowTypeA" top="이메일" bottom="support@ensemble.kr" />}
          />
          <ListRow
            border="none"
            contents={<ListRow.Texts type="2RowTypeA" top="전화" bottom="02-1234-5678" />}
          />
          <ListRow
            border="none"
            contents={<ListRow.Texts type="2RowTypeA" top="운영시간" bottom="평일 09:00 - 18:00" />}
          />
        </ContactList>
      </SectionCard>
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

const FaqItem = styled.div({
  borderBottom: `1px solid ${colors.grey100}`,
  '&:last-child': { borderBottom: 'none' },
});

const ContactList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
