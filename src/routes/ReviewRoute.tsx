import { useNavigate } from 'react-router-dom';
import { ReviewScreen } from '../screens/ReviewScreen';

export default function ReviewRoute() {
  const navigate = useNavigate();

  const handleSubmit = (_rating: number, _reviewText: string) => {
    // TODO: 백엔드 API 연동 후 실제 리뷰 등록 요청
    alert('리뷰가 등록되었습니다');
    navigate('/reservations');
  };

  return <ReviewScreen onSubmit={handleSubmit} />;
}
