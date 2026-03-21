import { useNavigate } from 'react-router-dom';
import { vendors } from '../data';
import { FavoritesScreen } from '../screens/FavoritesScreen';

export default function FavoritesRoute() {
  const navigate = useNavigate();

  return (
    <FavoritesScreen
      vendors={vendors}
      onOpenVendor={() => navigate(`/vendors/${vendors[0].id}`)}
    />
  );
}
