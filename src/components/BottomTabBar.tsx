import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faHeart,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "@toss/tds-colors";
import type { TabKey } from "../types";

interface BottomTabBarProps {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
}

const tabs: Array<{ key: TabKey; label: string; icon: typeof faHouse }> = [
  { key: "home", label: "홈", icon: faHouse },
  { key: "reservations", label: "예약", icon: faCalendarCheck },
  { key: "favorites", label: "찜", icon: faHeart },
  { key: "mypage", label: "마이", icon: faUser },
];

const BottomTabNav = styled.nav({
  position: "sticky",
  bottom: 0,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "8px",
  padding: "14px 16px 20px",
  background: "rgba(255, 255, 255, 0.96)",
  borderTop: `1px solid ${colors.grey200}`,
});

const TabButton = styled.button<{ active: boolean }>(({ active }) => ({
  border: 0,
  background: active ? colors.blue50 : "transparent",
  color: active ? colors.blue500 : colors.grey600,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  padding: "10px 0 8px",
  borderRadius: "14px",
  fontWeight: active ? 700 : 500,
}));

const TabLabel = styled.span({
  fontSize: "12px",
  lineHeight: 1,
});

const TabIcon = styled(FontAwesomeIcon)({
  fontSize: "18px",
});

export function BottomTabBar({ activeTab, onSelect }: BottomTabBarProps) {
  return (
    <BottomTabNav>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          type="button"
          active={tab.key === activeTab}
          onClick={() => onSelect(tab.key)}
        >
          <TabIcon icon={tab.icon} fixedWidth />
          <TabLabel>{tab.label}</TabLabel>
        </TabButton>
      ))}
    </BottomTabNav>
  );
}
