import styled from '@emotion/styled';
import { Button, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

export function ReviewScreen() {
  return (
    <>
      <SectionCard title="별점">
        <RatingRow>
          <StarButton type="button">★</StarButton>
          <StarButton type="button">★</StarButton>
          <StarButton type="button">★</StarButton>
          <StarButton type="button">★</StarButton>
          <StarButton type="button">★</StarButton>
        </RatingRow>
      </SectionCard>

      <SectionCard title="리뷰 작성">
        <TextArea
          variant="box"
          minHeight={180}
          placeholder="룸 컨디션, 장비 상태, 접근성 등을 적어주세요."
        />
      </SectionCard>

      <StickyCta>
        <Button size="xlarge" display="full">
          리뷰 등록
        </Button>
      </StickyCta>
    </>
  );
}

const RatingRow = styled.div({
  display: 'flex',
  gap: '12px',
});

const StarButton = styled.button({
  border: 0,
  background: 'transparent',
  fontSize: '28px',
  color: '#f59e0b',
});

const StickyCta = styled.div({
  position: 'sticky',
  bottom: '16px',
  display: 'flex',
  gap: '10px',
  marginTop: '20px',
  padding: '14px',
  borderRadius: '22px',
  background: 'rgba(255, 255, 255, 0.94)',
  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
});
