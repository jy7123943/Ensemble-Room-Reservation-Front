import { apiFetch } from './client';
import type { Reservation } from '../types';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80';

// --- snake_case API 응답 타입 ---

interface ApiReservation {
  id: string;
  reservation_number: string;
  user_id: string;
  room_id: string;
  vendor_id: string;
  vendor_name: string;
  room_name: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_price: number;
  status: string;
  user_memo: string;
  has_review: boolean;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
}

// --- 변환 함수 ---

function statusToFrontend(status: string): Reservation['status'] {
  switch (status) {
    case 'PENDING':
      return 'pending';
    case 'CONFIRMED':
      return 'confirmed';
    case 'COMPLETED':
      return 'completed';
    case 'CANCELLED':
      return 'cancelled';
    default:
      return 'confirmed';
  }
}

function formatDate(date: string): string {
  return date.replace(/-/g, '.');
}

function formatTime(start: string, end: string): string {
  return `${start.slice(0, 5)} - ${end.slice(0, 5)}`;
}

function formatPrice(price: number): string {
  return `${price.toLocaleString('ko-KR')}원`;
}

function toReservation(api: ApiReservation): Reservation {
  return {
    id: api.id,
    reservationNumber: api.reservation_number,
    vendorId: api.vendor_id,
    roomId: api.room_id,
    status: statusToFrontend(api.status),
    vendorName: api.vendor_name,
    imageUrl: DEFAULT_IMAGE,
    roomName: api.room_name,
    dateLabel: formatDate(api.date),
    timeLabel: formatTime(api.start_time, api.end_time),
    priceLabel: formatPrice(api.total_price),
    date: api.date,
    startTime: api.start_time,
    endTime: api.end_time,
    durationHours: api.duration_hours,
    totalPrice: api.total_price,
    userMemo: api.user_memo,
    hasReview: api.has_review ?? false,
  };
}

// --- API 함수 ---

export interface CreateReservationRequest {
  user_id: string;
  room_id: string;
  date: string;
  start_time: string;
  duration_hours: number;
  user_memo?: string;
}

export async function createReservation(data: CreateReservationRequest): Promise<Reservation> {
  const api = await apiFetch<ApiReservation>('/reservations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return toReservation(api);
}

export async function fetchUserReservations(userId: string): Promise<Reservation[]> {
  const data = await apiFetch<PaginatedResponse<ApiReservation>>(
    `/reservations?userId=${userId}`,
  );
  return data.content.map(toReservation);
}

export async function fetchReservation(id: string): Promise<Reservation> {
  const api = await apiFetch<ApiReservation>(`/reservations/${id}`);
  return toReservation(api);
}

export async function cancelReservation(
  id: string,
  body: { cancelled_by: string; cancel_reason: string },
): Promise<void> {
  await apiFetch<unknown>(`/reservations/${id}/cancel`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
