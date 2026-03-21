import { useNavigate } from 'react-router-dom';
import { reservations } from '../data';
import { CompleteScreen } from '../screens/CompleteScreen';

export default function CompleteRoute() {
  const navigate = useNavigate();
  const reservation = reservations[0];

  return (
    <CompleteScreen
      onViewReservation={() => navigate(`/reservations/${reservation.id}`)}
      onGoHome={() => navigate('/')}
    />
  );
}
