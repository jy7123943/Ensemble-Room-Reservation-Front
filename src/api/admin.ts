import { apiFetch } from './client';

export interface AdminVendor {
  id: string;
  name: string;
  phone: string;
  address: string;
  businessNumber: string;
  status: string;
  ownerName: string;
  createdAt: string;
}

export async function fetchPendingVendors(): Promise<AdminVendor[]> {
  const data = await apiFetch<any>('/admin/vendors/pending');
  return (data.content || []).map((v: any) => ({
    id: v.id,
    name: v.name,
    phone: v.phone,
    address: v.address,
    businessNumber: v.business_number,
    status: v.status,
    ownerName: v.owner_name,
    createdAt: v.created_at,
  }));
}

export async function approveVendor(id: string): Promise<void> {
  await apiFetch(`/admin/vendors/${id}/approve`, { method: 'POST' });
}

export async function rejectVendor(id: string): Promise<void> {
  await apiFetch(`/admin/vendors/${id}/reject`, { method: 'POST' });
}