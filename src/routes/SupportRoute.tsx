import { useNavigate } from 'react-router-dom';
import { SupportScreen } from '../screens/SupportScreen';

export default function SupportRoute() {
  const navigate = useNavigate();
  return <SupportScreen onBack={() => navigate('/mypage')} />;
}
