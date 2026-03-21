import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { rooms, timeSlots } from '../data';
import { BookingScreen } from '../screens/BookingScreen';

export default function BookingRoute() {
  const navigate = useNavigate();
  const { vendorId, roomId } = useParams();

  const room = rooms.find((item) => item.id === roomId && item.vendorId === vendorId);

  if (!room) {
    return <Navigate to="/" replace />;
  }

  return (
    <BookingScreen
      room={room}
      slots={timeSlots}
      onNext={() => navigate(`/vendors/${vendorId}/rooms/${roomId}/confirm`)}
    />
  );
}
