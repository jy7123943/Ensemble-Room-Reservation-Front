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
}

export interface Room {
  id: string;
  vendorId: string;
  name: string;
  capacity: number;
  price: number;
  equipment: string[];
}

export interface Reservation {
  id: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  vendorName: string;
  roomName: string;
  dateLabel: string;
  timeLabel: string;
  priceLabel: string;
}
