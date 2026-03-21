import type { TabKey } from '../types';

interface BottomTabBarProps {
  activeTab: TabKey;
  onSelect: (tab: TabKey) => void;
}

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: '홈' },
  { key: 'reservations', label: '예약' },
  { key: 'favorites', label: '찜' },
  { key: 'mypage', label: '마이' },
];

export function BottomTabBar({ activeTab, onSelect }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={tab.key === activeTab ? 'tab-item tab-item-active' : 'tab-item'}
          onClick={() => onSelect(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
