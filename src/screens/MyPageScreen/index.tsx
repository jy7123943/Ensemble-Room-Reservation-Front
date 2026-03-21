import styled from '@emotion/styled';
import { ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

export function MyPageScreen() {
  return (
    <>
      <SectionCard>
        <ListRow
          border="none"
          left={
            <ListRow.AssetText shape="squircle" size="medium">
              J
            </ListRow.AssetText>
          }
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top="주연"
              bottom="010-1234-5678"
            />
          }
        />
      </SectionCard>

      <SectionCard title="메뉴">
        <MenuList>
          <ListRow border="none" withArrow contents={<ListRow.Texts type="1RowTypeA" top="내 정보 수정" />} />
          <ListRow border="none" withArrow contents={<ListRow.Texts type="1RowTypeA" top="알림 설정" />} />
          <ListRow border="none" withArrow contents={<ListRow.Texts type="1RowTypeA" top="결제 내역" />} />
          <ListRow border="none" withArrow contents={<ListRow.Texts type="1RowTypeA" top="고객센터" />} />
        </MenuList>
      </SectionCard>
    </>
  );
}

const MenuList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
});
