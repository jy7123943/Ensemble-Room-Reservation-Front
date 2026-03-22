import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../api/users';
import type { User } from '../api/users';
import { MyPageScreen } from '../screens/MyPageScreen';

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export default function MyPageRoute() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(TEMP_USER_ID)
      .then(setUser)
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMenuClick = (menu: string) => {
    switch (menu) {
      case 'edit-profile':
        navigate('/mypage/edit-profile');
        break;
      case 'notifications':
        navigate('/mypage/notifications');
        break;
      case 'payments':
        navigate('/mypage/payments');
        break;
      case 'support':
        navigate('/mypage/support');
        break;
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return <MyPageScreen user={user} onMenuClick={handleMenuClick} />;
}
