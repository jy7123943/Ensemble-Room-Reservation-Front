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
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
    }
    navigate('/reservations');
  };

  return <ReviewScreen onSubmit={handleSubmit} />;
}
