import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserReservations } from '../api/reservations';
import type { Reservation } from '../types';
import { PaymentHistoryScreen } from '../screens/PaymentHistoryScreen';

const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export default function PaymentHistoryRoute() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserReservations(TEMP_USER_ID)
      .then((all) =>
        setReservations(
          all.filter((r) => r.status === 'confirmed' || r.status === 'completed'),
        ),
      )
      .catch(() => setReservations([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <PaymentHistoryScreen
      reservations={reservations}
      onBack={() => navigate('/mypage')}
    />
  );
}
