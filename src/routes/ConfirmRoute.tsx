import { useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { createReservation } from '../api/reservations';
import { ConfirmScreen } from '../screens/ConfirmScreen';

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

interface BookingState {
  vendorId: string;
  vendorName: string;
  roomId: string;
  roomName: string;
  date: string;
  dateLabel: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  totalPrice: number;
  hourlyPrice: number;
  timeLabel: string;
}

export default function ConfirmRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as BookingState | null;

  const [userMemo, setUserMemo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const handlePay = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const reservation = await createReservation({
        user_id: TEMP_USER_ID,
        room_id: state.roomId,
        date: state.date,
        start_time: state.startTime,
        duration_hours: state.durationHours,
        user_memo: userMemo || undefined,
      });
      navigate('/reservations/complete', {
        state: {
          reservationId: reservation.id,
          reservationNumber: reservation.reservationNumber ?? reservation.id,
          vendorName: state.vendorName,
          roomName: state.roomName,
          dateLabel: state.dateLabel,
          timeLabel: state.timeLabel,
        },
      });
    } catch {
      setIsLoading(false);
      alert('예약에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ConfirmScreen
      vendorName={state.vendorName}
      roomName={state.roomName}
      dateLabel={state.dateLabel}
      timeLabel={state.timeLabel}
      totalPrice={state.totalPrice}
      userMemo={userMemo}
      onMemoChange={setUserMemo}
      onPay={handlePay}
      isLoading={isLoading}
    />
  );
}
