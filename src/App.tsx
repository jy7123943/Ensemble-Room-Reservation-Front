import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { AppShell } from './routes/AppShell';

const HomeRoute = lazy(() => import('./routes/HomeRoute'));
const SearchRoute = lazy(() => import('./routes/SearchRoute'));
const VendorRoute = lazy(() => import('./routes/VendorRoute'));
const BookingRoute = lazy(() => import('./routes/BookingRoute'));
const ConfirmRoute = lazy(() => import('./routes/ConfirmRoute'));
const CompleteRoute = lazy(() => import('./routes/CompleteRoute'));
const ReservationsRoute = lazy(() => import('./routes/ReservationsRoute'));
const ReservationDetailRoute = lazy(() => import('./routes/ReservationDetailRoute'));
const FavoritesRoute = lazy(() => import('./routes/FavoritesRoute'));
const MyPageRoute = lazy(() => import('./routes/MyPageRoute'));
const ReviewRoute = lazy(() => import('./routes/ReviewRoute'));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<HomeRoute />} />
          <Route path="search" element={<SearchRoute />} />
          <Route path="vendors/:vendorId" element={<VendorRoute />} />
          <Route path="vendors/:vendorId/rooms/:roomId/book" element={<BookingRoute />} />
          <Route path="vendors/:vendorId/rooms/:roomId/confirm" element={<ConfirmRoute />} />
          <Route path="reservations" element={<ReservationsRoute />} />
          <Route path="reservations/complete" element={<CompleteRoute />} />
          <Route path="reservations/:reservationId" element={<ReservationDetailRoute />} />
          <Route path="reservations/:reservationId/review" element={<ReviewRoute />} />
          <Route path="favorites" element={<FavoritesRoute />} />
          <Route path="mypage" element={<MyPageRoute />} />
          <Route path="admin" element={<AdminRoute />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
