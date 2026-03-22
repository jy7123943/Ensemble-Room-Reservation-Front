import { useEffect, useState } from 'react';
import { fetchUserReviews, deleteReview } from '../api/reviews';
import type { Review } from '../api/reviews';
import { MyReviewsScreen } from '../screens/MyReviewsScreen';

export default function MyReviewsRoute() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = () => {
    setLoading(true);
    fetchUserReviews()
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (reviewId: string) => {
    if (!confirm('리뷰를 삭제하시겠습니까?')) return;
    try {
      await deleteReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch {
      alert('리뷰 삭제에 실패했습니다.');
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return <MyReviewsScreen reviews={reviews} onDelete={handleDelete} />;
}
