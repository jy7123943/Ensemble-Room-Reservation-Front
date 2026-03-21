import styled from '@emotion/styled';
import { SectionCard } from '../../components/SectionCard';

export function MyPageScreen() {
  return (
    <>
      <SectionCard>
        <ProfileBlock>
          <Avatar>J</Avatar>
          <div>
            <strong>주연</strong>
            <p>010-1234-5678</p>
          </div>
        </ProfileBlock>
      </SectionCard>

      <SectionCard title="메뉴">
        <MenuList>
          <MenuItem type="button">내 정보 수정</MenuItem>
          <MenuItem type="button">알림 설정</MenuItem>
          <MenuItem type="button">결제 내역</MenuItem>
          <MenuItem type="button">고객센터</MenuItem>
        </MenuList>
      </SectionCard>
    </>
  );
}

const ProfileBlock = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  '& p': {
    margin: '4px 0',
    color: '#64748b',
  },
});

const Avatar = styled.div({
  display: 'grid',
  placeItems: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '999px',
  background: '#dbeafe',
  color: '#1d4ed8',
  fontSize: '28px',
  fontWeight: 800,
});

const MenuList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MenuItem = styled.button({
  border: 0,
  borderBottom: '1px solid #eef2f7',
  background: 'transparent',
  padding: '14px 0',
  textAlign: 'left',
});
