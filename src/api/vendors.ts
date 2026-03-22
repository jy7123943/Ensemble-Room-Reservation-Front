import { apiFetch } from './client';
import type { Room, TimeSlot, Vendor } from '../types';

// --- snake_case API 응답 타입 ---

interface ApiVendor {
  id: string;
  name: string;
  phone: string;
  address: string;
  business_number: string;
  status: string;
  amenities: string[];
  operating_hours?: Record<string, { open: string; close: string; closed?: boolean }>;
  owner_name: string;
  created_at: string;
  rating?: number;
  review_count?: number;
  thumbnail_url?: string;
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

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const DAY_LABELS: Record<string, string> = {
  mon: '월', tue: '화', wed: '수', thu: '목', fri: '금', sat: '토', sun: '일',
};

function formatDayRange(days: string[]): string {
  if (days.length === 7) return '매일';
  if (days.length === 1) return days[0];

  // 연속 요일이면 범위로 표시 (월~금)
  const indices = days.map((d) => Object.values(DAY_LABELS).indexOf(d));
  const isConsecutive = indices.every((v, i) => i === 0 || v === indices[i - 1] + 1);
  if (isConsecutive && days.length >= 3) {
    return `${days[0]}~${days[days.length - 1]}`;
  }
  return days.join('·');
}

function formatOperatingHours(
  hours: Record<string, { open: string; close: string; closed?: boolean }>,
): string {
  // 요일 순서 보장
  const sorted = DAY_ORDER
    .filter((d) => hours[d] && !hours[d].closed)
    .map((d) => ({ day: d, ...hours[d] }));
  if (sorted.length === 0) return '휴무';

  // 같은 시간대끼리 그룹핑 (순서 유지)
  const groups: { days: string[]; open: string; close: string }[] = [];
  for (const entry of sorted) {
    const label = DAY_LABELS[entry.day];
    const existing = groups.find((g) => g.open === entry.open && g.close === entry.close);
    if (existing) {
      existing.days.push(label);
    } else {
      groups.push({ days: [label], open: entry.open, close: entry.close });
    }
  }

  return groups
    .map((g) => {
      const range = formatDayRange(g.days);
      return range === '매일'
        ? `매일 ${g.open} ~ ${g.close}`
        : `${range} ${g.open} ~ ${g.close}`;
    })
    .join('\n');
}

function toVendor(api: ApiVendor): Vendor {
  return {
    id: api.id,
    name: api.name,
    rating: api.rating ?? 0,
    reviewCount: api.review_count ?? 0,
    distance: '',
    address: api.address,
    priceLabel: '',
    amenities: api.amenities ?? [],
    imageUrl: api.thumbnail_url ?? '',
    operatingHours: api.operating_hours
      ? formatOperatingHours(api.operating_hours)
      : undefined,
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
