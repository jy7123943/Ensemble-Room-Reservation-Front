import { useNavigate, useLocation } from 'react-router-dom';
import { CompleteScreen } from '../screens/CompleteScreen';

export default function CompleteRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  // 결제 후 전달된 예약 ID (있으면 사용, 없으면 목록으로 이동)
  const reservationId = (location.state as { reservationId?: string })?.reservationId;

  return (
    <CompleteScreen
      onViewReservation={() =>
        navigate(reservationId ? `/reservations/${reservationId}` : '/reservations')
      }
      onGoHome={() => navigate('/')}
    />
  );
}
