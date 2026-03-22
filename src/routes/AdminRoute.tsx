import { useEffect, useState, useCallback } from 'react';
import { fetchPendingVendors, approveVendor, rejectVendor } from '../api/admin';
import type { AdminVendor } from '../api/admin';
import { AdminScreen } from '../screens/AdminScreen';

export default function AdminRoute() {
  const [vendors, setVendors] = useState<AdminVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingVendors()
      .then(setVendors)
      .catch(() => setVendors([]))
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = useCallback(async (id: string) => {
    setProcessingId(id);
    try {
      await approveVendor(id);
      setVendors((prev) => prev.filter((v) => v.id !== id));
    } catch {
      alert('승인 처리에 실패했습니다.');
    } finally {
      setProcessingId(null);
    }
  }, []);

  const handleReject = useCallback(async (id: string) => {
    if (!window.confirm('정말 이 업체를 거절하시겠습니까?')) return;
    setProcessingId(id);
    try {
      await rejectVendor(id);
      setVendors((prev) => prev.filter((v) => v.id !== id));
    } catch {
      alert('거절 처리에 실패했습니다.');
    } finally {
      setProcessingId(null);
    }
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <AdminScreen
      vendors={vendors}
      onApprove={handleApprove}
      onReject={handleReject}
      processingId={processingId}
    />
  );
}