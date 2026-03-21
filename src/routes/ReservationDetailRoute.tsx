import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { reservations } from '../data';
import { ReservationDetailScreen } from '../screens/ReservationDetailScreen';

export default function ReservationDetailRoute() {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const reservation = reservations.find((item) => item.id === reservationId);

  if (!reservation) {
    return <Navigate to="/reservations" replace />;
  }

  return (
    <ReservationDetailScreen
      reservation={reservation}
      onWriteReview={() => navigate(`/reservations/${reservation.id}/review`)}
    />
  );
}
