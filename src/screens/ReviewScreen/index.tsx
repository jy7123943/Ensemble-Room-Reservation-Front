import styled from '@emotion/styled';
import { FixedBottomCTA, TextArea } from '@toss/tds-mobile';
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

      <FixedBottomCTA>리뷰 등록</FixedBottomCTA>
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
