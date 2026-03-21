import { useNavigate } from 'react-router-dom';
import { reservations } from '../data';
import { ReservationsScreen } from '../screens/ReservationsScreen';

export default function ReservationsRoute() {
  const navigate = useNavigate();

  return (
    <ReservationsScreen
      reservations={reservations}
      onOpenDetail={() => navigate(`/reservations/${reservations[0].id}`)}
      onOpenReview={() => navigate(`/reservations/${reservations[1].id}/review`)}
    />
  );
}
