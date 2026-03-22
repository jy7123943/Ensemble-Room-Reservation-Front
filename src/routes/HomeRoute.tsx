import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../api/vendors';
import { vendors as mockVendors } from '../data';
import { HomeScreen } from '../screens/HomeScreen';
import type { Vendor } from '../types';

export default function HomeRoute() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors()
      .then(setVendors)
      .catch(() => {
        // API 실패 시 목 데이터로 폴백
        setVendors(mockVendors);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <HomeScreen
      vendors={vendors}
      onOpenVendor={() => {
        if (vendors.length > 0) navigate(`/vendors/${vendors[0].id}`);
      }}
      onOpenSearch={() => navigate('/search')}
    />
  );
}
