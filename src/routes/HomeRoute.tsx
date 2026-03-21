import { useNavigate } from 'react-router-dom';
import { vendors } from '../data';
import { HomeScreen } from '../screens/HomeScreen';

export default function HomeRoute() {
  const navigate = useNavigate();

  return (
    <HomeScreen
      vendors={vendors}
      onOpenVendor={() => navigate(`/vendors/${vendors[0].id}`)}
    />
  );
}
