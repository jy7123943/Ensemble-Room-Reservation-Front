import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchVendor, fetchRooms } from '../api/vendors';
import { VendorDetailScreen } from '../screens/VendorDetailScreen';
import type { Room, Vendor } from '../types';

export default function VendorRoute() {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!vendorId) return;

    Promise.all([fetchVendor(vendorId), fetchRooms(vendorId)])
      .then(([v, r]) => {
        setVendor(v);
        setRooms(r);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [vendorId]);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (error || !vendor) return <Navigate to="/" replace />;

  return (
    <VendorDetailScreen
      vendor={vendor}
      rooms={rooms}
      onOpenBooking={(roomId: string) =>
        navigate(`/vendors/${vendor.id}/rooms/${roomId}/book`)
      }
    />
  );
}
