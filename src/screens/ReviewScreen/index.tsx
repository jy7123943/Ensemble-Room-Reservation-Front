import styled from '@emotion/styled';
import { useState } from 'react';
import { FixedBottomCTA, TextArea } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';

interface ReviewScreenProps {
  onSubmit: (rating: number, reviewText: string) => void;
}

export function ReviewScreen({ onSubmit }: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  return (
    <>
      <SectionCard title="별점">
        <RatingRow>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarButton
              key={star}
              type="button"
              filled={star <= rating}
              onClick={() => setRating(star)}
            >
              {star <= rating ? '★' : '☆'}
            </StarButton>
          ))}
        </RatingRow>
      </SectionCard>

      <SectionCard title="리뷰 작성">
        <TextArea
          variant="box"
          minHeight={180}
          placeholder="룸 컨디션, 장비 상태, 접근성 등을 적어주세요."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </SectionCard>

      <FixedBottomCTA
        onClick={() => {
          if (rating === 0) {
            alert('별점을 선택해주세요.');
            return;
          }
          onSubmit(rating, reviewText);
        }}
      >
        리뷰 등록
      </FixedBottomCTA>
    </>
  );
}

const RatingRow = styled.div({
  display: 'flex',
  gap: '12px',
});

const StarButton = styled.button<{ filled?: boolean }>(({ filled }) => ({
  border: 0,
  background: 'transparent',
  fontSize: '28px',
  color: filled ? '#f59e0b' : '#d1d5db',
  cursor: 'pointer',
}));
