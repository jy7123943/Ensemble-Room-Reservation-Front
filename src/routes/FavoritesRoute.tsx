import { useNavigate } from 'react-router-dom';
import { vendors } from '../data';
import { FavoritesScreen } from '../screens/FavoritesScreen';

// TODO: 백엔드 찜 목록 API 구현 후 API 연동 필요
export default function FavoritesRoute() {
  const navigate = useNavigate();

  return (
    <FavoritesScreen
      vendors={vendors}
      onOpenVendor={(vendorId) => navigate(`/vendors/${vendorId}`)}
    />
  );
}
