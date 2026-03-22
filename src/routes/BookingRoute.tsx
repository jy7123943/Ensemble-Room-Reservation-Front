import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchRooms, fetchAvailability, fetchVendor } from '../api/vendors';
import { BookingScreen } from '../screens/BookingScreen';
import type { Room, TimeSlot } from '../types';

const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'] as const;

function formatDateLabel(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()} (${DAYS_KO[date.getDay()]})`;
}

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function generateNext7Days(): { value: string; label: string }[] {
  const result: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    result.push({ value: toDateString(d), label: formatDateLabel(d) });
  }
  return result;
}

export default function BookingRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { vendorId, roomId } = useParams();

  const [vendorName, setVendorName] = useState(
    (location.state as { vendorName?: string })?.vendorName ?? ''
  );

  // vendorName이 없으면 (직접 URL 접근) API로 조회
  useEffect(() => {
    if (vendorName || !vendorId) return;
    fetchVendor(vendorId)
      .then((vendor) => setVendorName(vendor.name))
      .catch(() => {
        // 업체 정보 조회 실패 시 홈으로 이동
        navigate('/', { replace: true });
      });
  }, [vendorId, vendorName, navigate]);

  const dates = useMemo(() => generateNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0].value);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const [room, setRoom] = useState<Room | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [hourlyPrice, setHourlyPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 룸 정보 한 번만 로드
  useEffect(() => {
    if (!vendorId || !roomId) return;
    fetchRooms(vendorId)
      .then((rooms) => {
        const found = rooms.find((r) => r.id === roomId) ?? null;
        setRoom(found);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [vendorId, roomId]);

  // 날짜 변경 시 가용 슬롯 로드
  useEffect(() => {
    if (!roomId) return;
    setSelectedSlots([]);
    fetchAvailability(roomId, selectedDate)
      .then((avail) => {
        setSlots(avail.slots);
        setHourlyPrice(avail.hourlyPrice);
      })
      .catch(() => {
        setSlots([]);
      });
  }, [roomId, selectedDate]);

  const handleSlotToggle = useCallback(
    (startTime: string) => {
      setSelectedSlots((prev) => {
        if (prev.includes(startTime)) {
          return prev.filter((s) => s !== startTime);
        }
        // 연속 슬롯 체크: 새 슬롯이 기존 선택과 인접한지 확인
        const next = [...prev, startTime].sort();
        // 슬롯 인덱스 기반으로 연속성 검증
        const slotStarts = slots.map((s) => s.start);
        const indices = next.map((s) => slotStarts.indexOf(s)).sort((a, b) => a - b);
        for (let i = 1; i < indices.length; i++) {
          if (indices[i] !== indices[i - 1] + 1) {
            // 연속이 아니면 새 슬롯만 선택
            return [startTime];
          }
        }
        return next;
      });
    },
    [slots],
  );

  const handleNext = useCallback(() => {
    if (!room || selectedSlots.length === 0) return;
    const sorted = [...selectedSlots].sort();
    const startTime = sorted[0];
    const lastSlot = slots.find((s) => s.start === sorted[sorted.length - 1]);
    const endTime = lastSlot?.end ?? '';
    const durationHours = sorted.length;
    const totalPrice = durationHours * hourlyPrice;

    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dateLabel = `${selectedDate.replace(/-/g, '.')} (${DAYS_KO[dateObj.getDay()]})`;

    navigate(`/vendors/${vendorId}/rooms/${roomId}/confirm`, {
      state: {
        vendorId,
        vendorName,
        roomId,
        roomName: room.name,
        date: selectedDate,
        dateLabel,
        startTime,
        endTime,
        durationHours,
        totalPrice,
        hourlyPrice,
        timeLabel: `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`,
      },
    });
  }, [room, selectedSlots, slots, hourlyPrice, selectedDate, vendorId, vendorName, roomId, navigate]);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (error || !room) return <Navigate to="/" replace />;

  return (
    <BookingScreen
      room={room}
      slots={slots}
      dates={dates}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      selectedSlots={selectedSlots}
      onSlotToggle={handleSlotToggle}
      hourlyPrice={hourlyPrice}
      onNext={handleNext}
    />
  );
}
