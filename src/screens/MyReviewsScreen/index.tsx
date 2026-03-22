import styled from '@emotion/styled';
import { colors } from '@toss/tds-colors';
import { ListRow } from '@toss/tds-mobile';
import { SectionCard } from '../../components/SectionCard';
import type { Review } from '../../api/reviews';

interface MyReviewsScreenProps {
  reviews: Review[];
  onDelete: (reviewId: string) => void;
}

export function MyReviewsScreen({ reviews, onDelete }: MyReviewsScreenProps) {
  if (reviews.length === 0) {
    return (
      <EmptyState>
        <EmptyText>작성한 리뷰가 없습니다.</EmptyText>
      </EmptyState>
    );
  }

  return (
    <>
      {reviews.map((review) => (
        <SectionCard key={review.id}>
          <ListRow
            border="none"
            contents={
              <ReviewContent>
                <VendorName>{review.vendorName}</VendorName>
                <RatingRow>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= review.rating}>
                      {star <= review.rating ? '★' : '☆'}
                    </Star>
                  ))}
                </RatingRow>
                <Content>{review.content}</Content>
                <DateText>{formatDate(review.createdAt)}</DateText>
              </ReviewContent>
            }
            right={
              <DeleteButton onClick={() => onDelete(review.id)}>
                삭제
              </DeleteButton>
            }
          />
        </SectionCard>
      ))}
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

const EmptyState = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
});

const EmptyText = styled.p({
  fontSize: '15px',
  color: colors.grey500,
});

const ReviewContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flex: 1,
});

const VendorName = styled.span({
  fontSize: '16px',
  fontWeight: 600,
  color: colors.grey900,
});

const RatingRow = styled.div({
  display: 'flex',
  gap: '2px',
});

const Star = styled.span<{ filled?: boolean }>(({ filled }) => ({
  fontSize: '14px',
  color: filled ? '#f59e0b' : '#d1d5db',
}));

const Content = styled.p({
  fontSize: '14px',
  color: colors.grey700,
  margin: 0,
  lineHeight: 1.5,
});

const DateText = styled.span({
  fontSize: '12px',
  color: colors.grey500,
});

const DeleteButton = styled.button({
  border: 0,
  background: 'transparent',
  fontSize: '13px',
  color: colors.grey500,
  cursor: 'pointer',
  padding: '4px 8px',
  whiteSpace: 'nowrap',
});
