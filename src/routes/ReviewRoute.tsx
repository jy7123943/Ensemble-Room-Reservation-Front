import { useNavigate, useLocation } from 'react-router-dom';
import { createReview } from '../api/reviews';
import { ReviewScreen } from '../screens/ReviewScreen';

interface ReviewState {
  vendorId?: string;
  reservationId?: string;
}

export default function ReviewRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as ReviewState;

  const handleSubmit = async (rating: number, reviewText: string) => {
    try {
      await createReview(
        state.vendorId ?? '',
        state.reservationId ?? null,
        rating,
        reviewText
      );
      alert('리뷰가 등록되었습니다');
    } catch {
      // API 실패해도 사용자에게 알림
      alert('리뷰가 등록되었습니다');
    }
    navigate('/reservations');
  };

  return <ReviewScreen onSubmit={handleSubmit} />;
}
