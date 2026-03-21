import { useNavigate } from 'react-router-dom';
import { reservations } from '../data';
import { ReservationsScreen } from '../screens/ReservationsScreen';

export default function ReservationsRoute() {
  const navigate = useNavigate();

  return (
    <ReservationsScreen
      reservations={reservations}
      onOpenDetail={(reservationId) => navigate(`/reservations/${reservationId}`)}
      onOpenReview={(reservationId) => navigate(`/reservations/${reservationId}/review`)}
    />
  );
}
