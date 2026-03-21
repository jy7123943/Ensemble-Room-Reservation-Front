import type { Vendor } from '../types';
import { Chip } from './Chip';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
}

export function VendorCard({ vendor, onClick }: VendorCardProps) {
  return (
    <button type="button" className="vendor-card" onClick={onClick}>
      <img src={vendor.imageUrl} alt={vendor.name} className="vendor-image" />
      <div className="vendor-copy">
        <div className="vendor-head">
          <strong>{vendor.name}</strong>
          <span>★ {vendor.rating}</span>
        </div>
        <p>{vendor.distance}</p>
        <p>{vendor.priceLabel}</p>
        <div className="chip-row">
          {vendor.amenities.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </div>
    </button>
  );
}
