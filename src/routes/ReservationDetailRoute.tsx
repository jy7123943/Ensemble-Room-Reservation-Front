import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchUserReservations } from '../api/reservations';
import { reservations as mockReservations } from '../data';
import { ReservationDetailScreen } from '../screens/ReservationDetailScreen';
import type { Reservation } from '../types';

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = 'REPLACE_WITH_REAL_USER_ID';

export default function ReservationDetailRoute() {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReservations(TEMP_USER_ID)
      .then((list) => {
        const found = list.find((item) => item.id === reservationId);
        setReservation(found ?? null);
      })
      .catch(() => {
        const found = mockReservations.find((item) => item.id === reservationId);
        setReservation(found ?? null);
      })
      .finally(() => setLoading(false));
  }, [reservationId]);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (!reservation) return <Navigate to="/reservations" replace />;

  return (
    <ReservationDetailScreen
      reservation={reservation}
      onWriteReview={() => navigate(`/reservations/${reservation.id}/review`)}
    />
  );
}
