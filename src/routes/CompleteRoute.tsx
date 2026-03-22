import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CompleteScreen } from '../screens/CompleteScreen';

interface CompleteState {
  reservationId: string;
  reservationNumber: string;
  vendorName: string;
  roomName: string;
  dateLabel: string;
  timeLabel: string;
}

export default function CompleteRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CompleteState | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return (
    <CompleteScreen
      reservationNumber={state.reservationNumber}
      vendorName={state.vendorName}
      roomName={state.roomName}
      dateLabel={state.dateLabel}
      timeLabel={state.timeLabel}
      onViewReservation={() =>
        navigate(state.reservationId ? `/reservations/${state.reservationId}` : '/reservations')
      }
      onGoHome={() => navigate('/')}
    />
  );
}
