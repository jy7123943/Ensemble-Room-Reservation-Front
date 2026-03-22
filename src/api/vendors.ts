import { apiFetch } from './client';
import type { Room, TimeSlot, Vendor } from '../types';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80';

// --- snake_case API 응답 타입 ---

interface ApiVendor {
  id: string;
  name: string;
  phone: string;
  address: string;
  business_number: string;
  status: string;
  amenities: string[];
  operating_hours: Record<string, string>;
  owner_name: string;
  created_at: string;
}

interface ApiRoom {
  id: string;
  name: string;
  description: string;
  capacity: number;
  hourly_price: number;
  min_hours: number;
  max_hours: number;
  equipment: Array<{ name: string; brand: string }>;
  images: string[];
  sort_order: number;
}

interface ApiAvailability {
  room_id: string;
  date: string;
  operating_hours: Record<string, string>;
  hourly_price: number;
  slots: Array<{ start: string; end: string; available: boolean; price: number }>;
}

interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
}

// --- 변환 함수 ---

function toVendor(api: ApiVendor): Vendor {
  return {
    id: api.id,
    name: api.name,
    rating: 0,
    reviewCount: 0,
    distance: '',
    address: api.address,
    priceLabel: '',
    amenities: api.amenities ?? [],
    imageUrl: DEFAULT_IMAGE,
  };
}

function toRoom(api: ApiRoom, vendorId: string): Room {
  return {
    id: api.id,
    vendorId,
    name: api.name,
    capacity: api.capacity,
    price: api.hourly_price,
    equipment: api.equipment?.map((e) => `${e.name}${e.brand ? ` (${e.brand})` : ''}`) ?? [],
  };
}

function toTimeSlots(slots: ApiAvailability['slots']): TimeSlot[] {
  return slots.map((s) => ({
    start: s.start,
    end: s.end,
    available: s.available,
    price: s.price,
    label: s.start.slice(0, 5),
  }));
}

// --- API 함수 ---

export async function fetchVendors(): Promise<Vendor[]> {
  const data = await apiFetch<PaginatedResponse<ApiVendor>>('/vendors');
  return data.content.map(toVendor);
}

export async function fetchVendor(id: string): Promise<Vendor> {
  const data = await apiFetch<ApiVendor>(`/vendors/${id}`);
  return toVendor(data);
}

export async function fetchRooms(vendorId: string): Promise<Room[]> {
  const data = await apiFetch<ApiRoom[]>(`/vendors/${vendorId}/rooms`);
  return data.map((r) => toRoom(r, vendorId));
}

export async function fetchAvailability(
  roomId: string,
  date: string,
): Promise<{ roomId: string; date: string; hourlyPrice: number; slots: TimeSlot[] }> {
  const data = await apiFetch<ApiAvailability>(
    `/rooms/${roomId}/availability?date=${date}`,
  );
  return {
    roomId: data.room_id,
    date: data.date,
    hourlyPrice: data.hourly_price,
    slots: toTimeSlots(data.slots),
  };
}
