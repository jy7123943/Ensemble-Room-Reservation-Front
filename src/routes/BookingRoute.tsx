import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchRooms, fetchAvailability } from '../api/vendors';
import { BookingScreen } from '../screens/BookingScreen';
import type { Room, TimeSlot } from '../types';

export default function BookingRoute() {
  const navigate = useNavigate();
  const { vendorId, roomId } = useParams();

  const [room, setRoom] = useState<Room | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 오늘 날짜를 기본값으로 사용
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!vendorId || !roomId) return;

    Promise.all([
      fetchRooms(vendorId).then((rooms) => rooms.find((r) => r.id === roomId) ?? null),
      fetchAvailability(roomId, today),
    ])
      .then(([r, avail]) => {
        setRoom(r);
        setSlots(avail.slots);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [vendorId, roomId, today]);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (error || !room) return <Navigate to="/" replace />;

  return (
    <BookingScreen
      room={room}
      slots={slots}
      onNext={() => navigate(`/vendors/${vendorId}/rooms/${roomId}/confirm`)}
    />
  );
}
