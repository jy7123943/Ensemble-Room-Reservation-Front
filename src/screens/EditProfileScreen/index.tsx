import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { Button } from '@toss/tds-mobile';
import type { User } from '../../api/users';

interface EditProfileScreenProps {
  user: User;
  nickname: string;
  phone: string;
  saving: boolean;
  onNicknameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSave: () => void;
  onBack: () => void;
}

export function EditProfileScreen({
  user,
  nickname,
  phone,
  saving,
  onNicknameChange,
  onPhoneChange,
  onSave,
  onBack,
}: EditProfileScreenProps) {
  return (
    <Container>
      <Header>
        <BackButton onClick={onBack}>&larr;</BackButton>
        <Title>내 정보 수정</Title>
      </Header>

      <Form>
        <FieldGroup>
          <Label>닉네임</Label>
          <Input
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="닉네임을 입력하세요"
          />
        </FieldGroup>

        <FieldGroup>
          <Label>전화번호</Label>
          <Input
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="전화번호를 입력하세요"
          />
        </FieldGroup>

        <ButtonWrapper>
          <Button
            variant="fill"
            size="large"
            onClick={onSave}
            disabled={saving || !nickname.trim()}
          >
            {saving ? '저장 중...' : '저장'}
          </Button>
        </ButtonWrapper>
      </Form>
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

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  paddingTop: 12,
});

const FieldGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Label = styled.label({
  fontSize: 14,
  fontWeight: 600,
  color: colors.grey700,
});

const Input = styled.input({
  padding: '12px 16px',
  fontSize: 16,
  border: `1px solid ${colors.grey300}`,
  borderRadius: 8,
  outline: 'none',
  '&:focus': {
    borderColor: colors.blue500,
  },
});

const ButtonWrapper = styled.div({
  paddingTop: 12,
});
