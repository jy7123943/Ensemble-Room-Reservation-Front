import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import type { TabKey } from "../types";

interface BottomTabBarProps {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
}

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "home", label: "홈" },
  { key: "reservations", label: "예약" },
  { key: "favorites", label: "찜" },
  { key: "mypage", label: "마이" },
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
  padding: "10px 0",
  borderRadius: "14px",
  fontWeight: active ? 700 : 500,
}));

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
          {tab.label}
        </TabButton>
      ))}
    </BottomTabNav>
  );
}
