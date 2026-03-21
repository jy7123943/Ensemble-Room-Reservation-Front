import { useNavigate } from 'react-router-dom';
import { vendors } from '../data';
import { SearchScreen } from '../screens/SearchScreen';

export default function SearchRoute() {
  const navigate = useNavigate();

  return (
    <SearchScreen
      vendors={vendors}
      onOpenVendor={(vendorId) => navigate(`/vendors/${vendorId}`)}
    />
  );
}
