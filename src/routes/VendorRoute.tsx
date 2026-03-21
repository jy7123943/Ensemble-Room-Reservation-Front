import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { rooms, vendors } from '../data';
import { VendorDetailScreen } from '../screens/VendorDetailScreen';

export default function VendorRoute() {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const vendor = vendors.find((item) => item.id === vendorId);

  if (!vendor) {
    return <Navigate to="/" replace />;
  }

  const vendorRooms = rooms.filter((room) => room.vendorId === vendor.id);
  const firstRoom = vendorRooms[0];

  return (
    <VendorDetailScreen
      vendor={vendor}
      rooms={vendorRooms}
      onOpenBooking={() =>
        navigate(`/vendors/${vendor.id}/rooms/${firstRoom.id}/book`)
      }
    />
  );
}
