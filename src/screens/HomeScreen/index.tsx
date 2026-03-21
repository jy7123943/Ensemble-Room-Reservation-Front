import styled from "@emotion/styled";
import type { Vendor } from "../../types";
import { VendorCard } from "../../components/VendorCard";

interface HomeScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
}

export function HomeScreen({ vendors, onOpenVendor }: HomeScreenProps) {
  return (
    <div style={{ padding: "0 20px" }}>
      <Stack>
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onClick={onOpenVendor}
            variant="featured"
          />
        ))}
      </Stack>
    </div>
  );
}

const Stack = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: 0,
});
