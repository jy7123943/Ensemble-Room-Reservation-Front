import styled from '@emotion/styled';
import { ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';
import type { User } from '../../api/users';

interface MyPageScreenProps {
  user: User | null;
  onMenuClick: (menu: string) => void;
}

export function MyPageScreen({ user, onMenuClick }: MyPageScreenProps) {
  const nickname = user?.nickname ?? '사용자';
  const phone = user?.phone ?? '';
  const initial = nickname.charAt(0).toUpperCase();

  return (
    <>
      <SectionCard>
        <ListRow
          border="none"
          left={
            <ListRow.AssetText shape="squircle" size="medium">
              {initial}
            </ListRow.AssetText>
          }
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top={nickname}
              bottom={phone}
            />
          }
        />
      </SectionCard>

      <SectionCard title="메뉴">
        <MenuList>
          <ListRow
            border="none"
            withArrow
            onClick={() => onMenuClick('edit-profile')}
            contents={<ListRow.Texts type="1RowTypeA" top="내 정보 수정" />}
          />
          <ListRow
            border="none"
            withArrow
            onClick={() => onMenuClick('notifications')}
            contents={<ListRow.Texts type="1RowTypeA" top="알림 설정" />}
          />
          <ListRow
            border="none"
            withArrow
            onClick={() => onMenuClick('reviews')}
            contents={<ListRow.Texts type="1RowTypeA" top="내 리뷰" />}
          />
          <ListRow
            border="none"
            withArrow
            onClick={() => onMenuClick('payments')}
            contents={<ListRow.Texts type="1RowTypeA" top="결제 내역" />}
          />
          <ListRow
            border="none"
            withArrow
            onClick={() => onMenuClick('support')}
            contents={<ListRow.Texts type="1RowTypeA" top="고객센터" />}
          />
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
