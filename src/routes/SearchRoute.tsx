import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVendors } from '../api/vendors';
import { vendors as mockVendors } from '../data';
import { SearchScreen } from '../screens/SearchScreen';
import type { Vendor } from '../types';

export default function SearchRoute() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors()
      .then(setVendors)
      .catch(() => setVendors(mockVendors))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <SearchScreen
      vendors={vendors}
      onOpenVendor={(vendorId) => navigate(`/vendors/${vendorId}`)}
    />
  );
}
