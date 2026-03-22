import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchVendor, fetchRooms } from '../api/vendors';
import { checkFavorite, addFavorite, removeFavorite } from '../api/favorites';
import { VendorDetailScreen } from '../screens/VendorDetailScreen';
import type { Room, Vendor } from '../types';

export default function VendorRoute() {
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!vendorId) return;

    Promise.all([fetchVendor(vendorId), fetchRooms(vendorId), checkFavorite(vendorId)])
      .then(([v, r, fav]) => {
        setVendor(v);
        setRooms(r);
        setIsFavorite(fav);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [vendorId]);

  const handleToggleFavorite = useCallback(async () => {
    if (!vendorId) return;
    try {
      if (isFavorite) {
        await removeFavorite(vendorId);
        setIsFavorite(false);
      } else {
        await addFavorite(vendorId);
        setIsFavorite(true);
      }
    } catch {
      // 실패 시 무시
    }
  }, [vendorId, isFavorite]);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (error || !vendor) return <Navigate to="/" replace />;

  return (
    <VendorDetailScreen
      vendor={vendor}
      rooms={rooms}
      onOpenBooking={(roomId: string) =>
        navigate(`/vendors/${vendor.id}/rooms/${roomId}/book`, {
          state: { vendorName: vendor.name },
        })
      }
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
