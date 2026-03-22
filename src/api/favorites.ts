import { apiFetch } from './client';
import type { Vendor } from '../types';

interface ApiFavorite {
  id: string;
  vendor_id: string;
  vendor_name: string;
  vendor_address: string;
  vendor_rating: number;
  vendor_review_count: number;
  vendor_image_url: string;
  created_at: string;
}

function toVendor(fav: ApiFavorite): Vendor {
  return {
    id: fav.vendor_id,
    name: fav.vendor_name,
    address: fav.vendor_address,
    rating: fav.vendor_rating ?? 0,
    reviewCount: fav.vendor_review_count ?? 0,
    imageUrl: fav.vendor_image_url ?? '',
    distance: '',
    priceLabel: '',
    amenities: [],
  };
}

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export async function fetchFavorites(): Promise<Vendor[]> {
  const data = await apiFetch<ApiFavorite[]>(`/favorites?userId=${TEMP_USER_ID}`);
  return data.map(toVendor);
}

export async function addFavorite(vendorId: string): Promise<void> {
  await apiFetch('/favorites', {
    method: 'POST',
    body: JSON.stringify({ user_id: TEMP_USER_ID, vendor_id: vendorId }),
  });
}

export async function removeFavorite(vendorId: string): Promise<void> {
  await apiFetch('/favorites', {
    method: 'DELETE',
    body: JSON.stringify({ user_id: TEMP_USER_ID, vendor_id: vendorId }),
  });
}

export async function checkFavorite(vendorId: string): Promise<boolean> {
  return apiFetch<boolean>(`/favorites/check?userId=${TEMP_USER_ID}&vendorId=${vendorId}`);
}
