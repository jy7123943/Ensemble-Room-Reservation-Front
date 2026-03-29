import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

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
  {
    q: '찜한 업체는 어디서 확인하나요?',
    a: '하단 탭의 "찜" 메뉴에서 저장한 업체 목록을 확인하실 수 있습니다.',
  },
  {
    q: '리뷰는 언제 작성할 수 있나요?',
    a: '이용이 완료된 예약에 한해 리뷰를 작성할 수 있습니다. 예약 내역에서 "리뷰 작성" 버튼을 눌러주세요.',
  },
  {
    q: '작성한 리뷰를 삭제할 수 있나요?',
    a: '마이페이지 > 내 리뷰에서 삭제할 수 있습니다. 삭제된 리뷰는 복구할 수 없습니다.',
  },
  {
    q: '결제 수단은 어떤 것이 있나요?',
    a: '현재 토스페이를 통한 결제를 지원하고 있습니다.',
  },
];

export function SupportScreen() {
  return (
    <>
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

      <SectionCard title="약관 및 정책">
        <ContactList>
          <ListRow
            border="none"
            withArrow
            contents={<ListRow.Texts type="1RowTypeA" top="이용약관" />}
          />
          <ListRow
            border="none"
            withArrow
            contents={<ListRow.Texts type="1RowTypeA" top="개인정보처리방침" />}
          />
        </ContactList>
      </SectionCard>

      <VersionInfo>앱 버전 1.0.0</VersionInfo>
    </>
  );
}

const FaqItem = styled.div({
  borderBottom: `1px solid ${colors.grey100}`,
  '&:last-child': { borderBottom: 'none' },
});

const ContactList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const VersionInfo = styled.p({
  textAlign: 'center',
  fontSize: '12px',
  color: colors.grey400,
  padding: '20px 0 40px',
});
