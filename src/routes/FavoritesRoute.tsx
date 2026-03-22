import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFavorites } from '../api/favorites';
import { vendors as mockVendors } from '../data';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import type { Vendor } from '../types';

export default function FavoritesRoute() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites()
      .then(setVendors)
      .catch(() => {
        // API 실패 시 목 데이터로 폴백
        setVendors(mockVendors);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <FavoritesScreen
      vendors={vendors}
      onOpenVendor={(vendorId) => navigate(`/vendors/${vendorId}`)}
    />
  );
}
