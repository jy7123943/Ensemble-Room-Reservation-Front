import type { Reservation, Room, Vendor } from './types';

export const vendors: Vendor[] = [
  {
    id: 'sound-box',
    name: '사운드박스 합주실',
    rating: 4.8,
    reviewCount: 128,
    distance: '강남역 300m',
    address: '서울 강남구 테헤란로 12',
    priceLabel: '15,000원~/시간',
    amenities: ['주차', '와이파이', '음료'],
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'band-lab',
    name: '밴드랩 스튜디오',
    rating: 4.7,
    reviewCount: 96,
    distance: '홍대입구 500m',
    address: '서울 마포구 와우산로 22',
    priceLabel: '18,000원~/시간',
    amenities: ['녹음', '대기실'],
    imageUrl:
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80',
  },
];

export const rooms: Room[] = [
  {
    id: 'a-room',
    vendorId: 'sound-box',
    name: 'A룸',
    capacity: 4,
    price: 15000,
    equipment: ['드럼', '기타앰프', '베이스앰프', '마이크 2개'],
  },
  {
    id: 'b-room',
    vendorId: 'sound-box',
    name: 'B룸',
    capacity: 6,
    price: 20000,
    equipment: ['드럼', '키보드', '믹서', '모니터 스피커'],
  },
];

export const reservations: Reservation[] = [
  {
    id: 'R-20260315-A7K2',
    vendorId: 'sound-box',
    status: 'confirmed',
    vendorName: '사운드박스 합주실',
    imageUrl:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
    roomName: 'A룸',
    dateLabel: '2026.03.15',
    timeLabel: '12:00 - 14:00',
    priceLabel: '30,000원',
  },
  {
    id: 'R-20260302-K9D1',
    vendorId: 'band-lab',
    status: 'completed',
    vendorName: '밴드랩 스튜디오',
    imageUrl:
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=800&q=80',
    roomName: 'B룸',
    dateLabel: '2026.03.02',
    timeLabel: '18:00 - 20:00',
    priceLabel: '36,000원',
  },
];

export const timeSlots: import('./types').TimeSlot[] = [
  { label: '09:00', start: '09:00', end: '10:00', available: true, price: 15000 },
  { label: '10:00', start: '10:00', end: '11:00', available: true, price: 15000 },
  { label: '11:00', start: '11:00', end: '12:00', available: false, price: 15000 },
  { label: '12:00', start: '12:00', end: '13:00', available: true, price: 12000 },
  { label: '13:00', start: '13:00', end: '14:00', available: true, price: 15000 },
  { label: '14:00', start: '14:00', end: '15:00', available: true, price: 15000 },
  { label: '15:00', start: '15:00', end: '16:00', available: false, price: 15000 },
  { label: '16:00', start: '16:00', end: '17:00', available: true, price: 15000 },
  { label: '17:00', start: '17:00', end: '18:00', available: true, price: 15000 },
];
