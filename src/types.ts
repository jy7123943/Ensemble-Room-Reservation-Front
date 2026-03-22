export type TabKey = 'home' | 'reservations' | 'favorites' | 'mypage';

export interface Vendor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  priceLabel: string;
  amenities: string[];
  imageUrl: string;
  operatingHours?: string;
}

export interface Room {
  id: string;
  vendorId: string;
  name: string;
  capacity: number;
  price: number;
  equipment: string[];
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
  price: number;
  /** 화면 표시용 (e.g. "09:00") */
  label: string;
}

export interface Reservation {
  id: string;
  reservationNumber?: string;
  vendorId: string;
  roomId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  vendorName: string;
  imageUrl: string;
  roomName: string;
  dateLabel: string;
  timeLabel: string;
  priceLabel: string;
  /** API 원본 필드 (선택적) */
  date?: string;
  startTime?: string;
  endTime?: string;
  durationHours?: number;
  totalPrice?: number;
  userMemo?: string;
  hasReview?: boolean;
}
