import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { ListRow } from "@toss/tds-mobile";
import type { Vendor } from "../types";
import { Chip } from "./Chip";

interface VendorCardProps {
  vendor: Vendor;
  onClick?: () => void;
  variant?: "default" | "featured";
}

const ChipRow = styled.div({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  marginTop: "6px",
});

function ratingLabel(vendor: Vendor): string {
  if (vendor.rating > 0) return `★ ${vendor.rating} (${vendor.reviewCount})`;
  return "리뷰 없음";
}

export function VendorCard({
  vendor,
  onClick,
  variant = "default",
}: VendorCardProps) {
  if (variant === "featured") {
    return (
      <FeaturedCard type="button" onClick={onClick}>
        <FeaturedImage src={vendor.imageUrl} alt={vendor.name} />
        <FeaturedBody>
          <FeaturedTopLine>
            <FeaturedName>{vendor.name}</FeaturedName>
            <Chip>{vendor.distance}</Chip>
          </FeaturedTopLine>
          <FeaturedMeta>
            {ratingLabel(vendor)}{vendor.priceLabel ? ` · ${vendor.priceLabel}` : ''}
          </FeaturedMeta>
          <ChipRow>
            {vendor.amenities.slice(0, 3).map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </ChipRow>
        </FeaturedBody>
      </FeaturedCard>
    );
  }

  return (
    <ListRow
      border="none"
      withTouchEffect
      arrowType={onClick ? "right" : undefined}
      onClick={onClick}
      left={
        <ListRow.AssetImage
          src={vendor.imageUrl}
          shape="square"
          size="medium"
        />
      }
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={vendor.name}
          middle={vendor.distance ? `${vendor.distance} · ${ratingLabel(vendor)}` : ratingLabel(vendor)}
          bottom={
            <ChipRow>
              <Chip>{vendor.priceLabel}</Chip>
              {vendor.amenities.slice(0, 2).map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </ChipRow>
          }
        />
      }
    />
  );
}

const FeaturedCard = styled.button({
  width: "100%",
  padding: 0,
  border: 0,
  background: "transparent",
  textAlign: "left",
});

const FeaturedImage = styled.img({
  display: "block",
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "16px",
});

const FeaturedBody = styled.div({
  padding: "10px 4px 0px",
});

const FeaturedTopLine = styled.div({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "8px",
});

const FeaturedName = styled.strong({
  color: colors.grey900,
  fontSize: "18px",
  lineHeight: 1.3,
});

const FeaturedMeta = styled.p({
  margin: "6px 0 0",
  color: colors.grey600,
  fontSize: "14px",
  lineHeight: 1.4,
});
