import { useNavigate } from 'react-router-dom';
import { ConfirmScreen } from '../screens/ConfirmScreen';

export default function ConfirmRoute() {
  const navigate = useNavigate();

  return <ConfirmScreen onPay={() => navigate('/reservations/complete')} />;
}
