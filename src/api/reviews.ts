import { apiFetch } from './client';

export interface Review {
  id: string;
  userId: string;
  userNickname: string;
  vendorId: string;
  vendorName: string;
  reservationId: string | null;
  rating: number;
  content: string;
  createdAt: string;
}

interface ApiReview {
  id: string;
  user_id: string;
  user_nickname: string;
  vendor_id: string;
  vendor_name: string;
  reservation_id: string | null;
  rating: number;
  content: string;
  created_at: string;
}

function toReview(api: ApiReview): Review {
  return {
    id: api.id,
    userId: api.user_id,
    userNickname: api.user_nickname,
    vendorId: api.vendor_id,
    vendorName: api.vendor_name,
    reservationId: api.reservation_id,
    rating: api.rating,
    content: api.content,
    createdAt: api.created_at,
  };
}

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export async function createReview(
  vendorId: string,
  reservationId: string | null,
  rating: number,
  content: string
): Promise<Review> {
  const data = await apiFetch<ApiReview>('/reviews', {
    method: 'POST',
    body: JSON.stringify({
      user_id: TEMP_USER_ID,
      vendor_id: vendorId,
      reservation_id: reservationId,
      rating,
      content,
    }),
  });
  return toReview(data);
}

export async function fetchVendorReviews(vendorId: string): Promise<Review[]> {
  const data = await apiFetch<ApiReview[]>(`/reviews/vendor/${vendorId}`);
  return data.map(toReview);
}

export async function fetchUserReviews(): Promise<Review[]> {
  const data = await apiFetch<ApiReview[]>(`/reviews/user/${TEMP_USER_ID}`);
  return data.map(toReview);
}

export async function deleteReview(reviewId: string): Promise<void> {
  await apiFetch(`/reviews/${reviewId}?userId=${TEMP_USER_ID}`, {
    method: 'DELETE',
  });
}
