import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchUserReservations, cancelReservation } from '../api/reservations';
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

  const handleCancel = async () => {
    if (!reservationId) return;
    const confirmed = window.confirm('예약을 취소하시겠습니까?');
    if (!confirmed) return;

    try {
      await cancelReservation(reservationId, {
        cancelled_by: 'USER',
        cancel_reason: '사용자 요청 취소',
      });
      navigate('/reservations', { replace: true });
    } catch {
      alert('예약 취소에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (!reservation) return <Navigate to="/reservations" replace />;

  return (
    <ReservationDetailScreen
      reservation={reservation}
      onWriteReview={() => navigate(`/reservations/${reservation.id}/review`)}
      onCancel={handleCancel}
    />
  );
}