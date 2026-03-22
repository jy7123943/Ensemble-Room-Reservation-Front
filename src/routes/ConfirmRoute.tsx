import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmScreen } from '../screens/ConfirmScreen';

export default function ConfirmRoute() {
  const navigate = useNavigate();
  const { vendorId, roomId } = useParams();

  // TODO: 이전 화면(BookingScreen)에서 선택한 예약 정보를 state로 전달받도록 개선
  return (
    <ConfirmScreen
      onPay={() =>
        navigate('/reservations/complete', {
          state: { vendorId, roomId },
        })
      }
    />
  );
}
