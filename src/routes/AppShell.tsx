import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { Skeleton } from "@toss/tds-mobile";
import { Suspense } from "react";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BottomTabBar } from "../components/BottomTabBar";
import { PageLayout } from "../components/PageLayout";
import type { TabKey } from "../types";

const routeMeta: Array<{
  pattern: string;
  title: string;
  subtitle: string;
  tab: TabKey;
}> = [
  {
    pattern: "/",
    title: "안녕하세요, 주연님",
    subtitle: "내 위치에서 가까운 순으로 합주실을 보여드릴게요.",
    tab: "home",
  },
  {
    pattern: "/search",
    title: "지도에서 찾기",
    subtitle: "핀을 눌러 위치를 보고, 가까운 순으로 바로 비교해보세요.",
    tab: "home",
  },
  {
    pattern: "/vendors/:vendorId",
    title: "업체 상세",
    subtitle: "업체 정보와 룸 구성을 확인하세요.",
    tab: "home",
  },
  {
    pattern: "/vendors/:vendorId/rooms/:roomId/book",
    title: "룸 예약",
    subtitle: "날짜와 시간을 골라 예약을 진행하세요.",
    tab: "home",
  },
  {
    pattern: "/vendors/:vendorId/rooms/:roomId/confirm",
    title: "예약 확인",
    subtitle: "결제 전 정보를 한 번 더 확인하세요.",
    tab: "home",
  },
  {
    pattern: "/reservations/complete",
    title: "예약 완료",
    subtitle: "예약이 정상적으로 접수되었어요.",
    tab: "reservations",
  },
  {
    pattern: "/reservations",
    title: "예약 내역",
    subtitle: "예정, 완료, 취소 예약을 관리하세요.",
    tab: "reservations",
  },
  {
    pattern: "/reservations/:reservationId/review",
    title: "리뷰 작성",
    subtitle: "이용 경험을 남겨 다른 사용자에게 도움을 주세요.",
    tab: "reservations",
  },
  {
    pattern: "/reservations/:reservationId",
    title: "예약 상세",
    subtitle: "예약 정보와 후속 액션을 확인하세요.",
    tab: "reservations",
  },
  {
    pattern: "/favorites",
    title: "찜 목록",
    subtitle: "저장한 업체를 다시 둘러보세요.",
    tab: "favorites",
  },
  {
    pattern: "/mypage",
    title: "마이페이지",
    subtitle: "개인 설정과 내 정보를 관리하세요.",
    tab: "mypage",
  },
  {
    pattern: "/admin",
    title: "관리자",
    subtitle: "업체 승인 및 시스템 관리",
    tab: "mypage",
  },
];

const fallbackMeta = routeMeta[0];

const RouteLoading = styled.div({
  padding: "24px 0",
  color: colors.grey600,
});

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeMeta =
    routeMeta.find((item) =>
      matchPath(
        {
          path: item.pattern,
          end:
            item.pattern === "/" ||
            item.pattern === "/search" ||
            item.pattern === "/reservations" ||
            item.pattern === "/favorites" ||
            item.pattern === "/mypage" ||
            item.pattern === "/admin",
        },
        location.pathname
      )
    ) ?? fallbackMeta;

  const handleTabSelect = (tab: TabKey) => {
    if (tab === "home") navigate("/");
    if (tab === "reservations") navigate("/reservations");
    if (tab === "favorites") navigate("/favorites");
    if (tab === "mypage") navigate("/mypage");
  };

  return (
    <PageLayout
      title={activeMeta.title}
      subtitle={activeMeta.subtitle}
      footer={
        <BottomTabBar activeTab={activeMeta.tab} onSelect={handleTabSelect} />
      }
    >
      <Suspense
        fallback={
          <RouteLoading>
            <Skeleton />
          </RouteLoading>
        }
      >
        <Outlet />
      </Suspense>
    </PageLayout>
  );
}
