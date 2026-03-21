import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@toss/tds-colors";
import type { Vendor } from "../../types";
import { VendorCard } from "../../components/VendorCard";

interface HomeScreenProps {
  vendors: Vendor[];
  onOpenVendor: () => void;
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
