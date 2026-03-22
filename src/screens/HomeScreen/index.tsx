import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@toss/tds-colors";
import type { Vendor } from "../../types";
import { VendorCard } from "../../components/VendorCard";

interface HomeScreenProps {
  vendors: Vendor[];
  onOpenVendor: (vendorId: string) => void;
  onOpenSearch: () => void;
}

export function HomeScreen({
  vendors,
  onOpenVendor,
  onOpenSearch,
}: HomeScreenProps) {
  return (
    <Content>
      <SearchBarSticky>
        <SearchBar type="button" onClick={onOpenSearch}>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchPlaceholder>내게 맞는 합주실 찾기</SearchPlaceholder>
        </SearchBar>
      </SearchBarSticky>
      {vendors.length === 0 ? (
        <EmptyState>
          <EmptyIcon>🎸</EmptyIcon>
          <EmptyText>등록된 합주실이 없습니다</EmptyText>
          <EmptySubText>곧 새로운 합주실이 등록될 예정이에요</EmptySubText>
        </EmptyState>
      ) : (
        <Stack>
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onClick={() => onOpenVendor(vendor.id)}
              variant="featured"
            />
          ))}
        </Stack>
      )}
    </Content>
  );
}

const Content = styled.div({
  padding: "0 20px",
});

const SearchBarSticky = styled.div({
  position: "sticky",
  top: 0,
  zIndex: 10,
  padding: "12px 0px 12px",
  background: colors.background,
  marginTop: "-12px",
});

const SearchBar = styled.button({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "11px 16px",
  border: `1px solid ${colors.grey100}`,
  borderRadius: "16px",
  background: colors.grey50,
  textAlign: "left",
});

const SearchIcon = styled(FontAwesomeIcon)({
  fontSize: "15px",
  color: colors.grey500,
});

const SearchPlaceholder = styled.span({
  color: colors.grey500,
  fontSize: "15px",
  lineHeight: 1.4,
});

const Stack = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: 0,
});

const EmptyState = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
  textAlign: "center",
});

const EmptyIcon = styled.span({
  fontSize: "48px",
  marginBottom: "16px",
});

const EmptyText = styled.p({
  margin: 0,
  fontSize: "17px",
  fontWeight: 700,
  color: colors.grey900,
});

const EmptySubText = styled.p({
  margin: "8px 0 0",
  fontSize: "14px",
  color: colors.grey500,
});
