import { Badge, Button } from '@toss/tds-mobile';
import type { Room, Vendor } from '../types';
import { SectionCard } from '../components/SectionCard';

interface VendorDetailScreenProps {
  vendor: Vendor;
  rooms: Room[];
  onOpenBooking: () => void;
}

export function VendorDetailScreen({
  vendor,
  rooms,
  onOpenBooking,
}: VendorDetailScreenProps) {
  return (
    <>
      <img src={vendor.imageUrl} alt={vendor.name} className="hero-image" />
      <SectionCard>
        <div className="vendor-title-row">
          <div>
            <h2 className="page-section-title">{vendor.name}</h2>
            <p>★ {vendor.rating} ({vendor.reviewCount})</p>
            <p>{vendor.address}</p>
            <p>09:00 - 23:00</p>
          </div>
          <button type="button" className="ghost-icon-button">
            ♡
          </button>
        </div>
        <div className="chip-row">
          {vendor.amenities.map((item) => (
            <Badge key={item} size="small" variant="weak" color="blue">
              {item}
            </Badge>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="룸 목록">
        <div className="stack">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <div>
                <strong>{room.name}</strong>
                <p>{room.capacity}인</p>
                <p>{room.price.toLocaleString('ko-KR')}원/시간</p>
              </div>
              <Button size="small" onClick={onOpenBooking}>
                예약
              </Button>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
