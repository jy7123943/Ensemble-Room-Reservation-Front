import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';

export interface NotificationSettings {
  reservationAlert: boolean;
  reviewAlert: boolean;
  marketingAlert: boolean;
}

interface NotificationSettingsScreenProps {
  settings: NotificationSettings;
  onToggle: (key: keyof NotificationSettings) => void;
  onBack: () => void;
}

export function NotificationSettingsScreen({
  settings,
  onToggle,
  onBack,
}: NotificationSettingsScreenProps) {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>&larr;</BackButton>
        <Title>알림 설정</Title>
      </Header>

      <SettingsList>
        <ListRow
          border="none"
          contents={<ListRow.Texts type="2RowTypeA" top="예약 알림" bottom="예약 확인, 취소, 변경 알림" />}
          right={
            <Toggle
              checked={settings.reservationAlert}
              onChange={() => onToggle('reservationAlert')}
            />
          }
        />
        <ListRow
          border="none"
          contents={<ListRow.Texts type="2RowTypeA" top="리뷰 알림" bottom="리뷰 작성 요청 알림" />}
          right={
            <Toggle
              checked={settings.reviewAlert}
              onChange={() => onToggle('reviewAlert')}
            />
          }
        />
        <ListRow
          border="none"
          contents={<ListRow.Texts type="2RowTypeA" top="마케팅 알림" bottom="이벤트, 할인 정보 알림" />}
          right={
            <Toggle
              checked={settings.marketingAlert}
              onChange={() => onToggle('marketingAlert')}
            />
          }
        />
      </SettingsList>
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

const SettingsList = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ToggleBase = styled.input({
  width: 44,
  height: 24,
  appearance: 'none',
  background: colors.grey300,
  borderRadius: 12,
  position: 'relative',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:checked': {
    background: colors.blue500,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 2,
    left: 2,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: colors.white,
    transition: 'transform 0.2s',
  },
  '&:checked::after': {
    transform: 'translateX(20px)',
  },
});

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return <ToggleBase type="checkbox" checked={checked} onChange={onChange} />;
}
