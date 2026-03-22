import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserReservations } from '../api/reservations';
import { reservations as mockReservations } from '../data';
import { ReservationsScreen } from '../screens/ReservationsScreen';
import type { Reservation } from '../types';

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export default function ReservationsRoute() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReservations(TEMP_USER_ID)
      .then(setReservations)
      .catch(() => setReservations(mockReservations))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <ReservationsScreen
      reservations={reservations}
      onOpenDetail={(reservationId) => navigate(`/reservations/${reservationId}`)}
      onOpenReview={(reservationId) => navigate(`/reservations/${reservationId}/review`)}
    />
  );
}
