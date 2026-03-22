import { useEffect, useState } from 'react';
import { fetchUser } from '../api/users';
import type { User } from '../api/users';
import { MyPageScreen } from '../screens/MyPageScreen';

// TODO: 토스 로그인 연동 후 실제 사용자 ID로 교체
const TEMP_USER_ID = 'REPLACE_WITH_REAL_USER_ID';

export default function MyPageRoute() {
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
        alert('내 정보 수정 기능은 준비 중입니다');
        break;
      case 'notifications':
        alert('알림 설정 기능은 준비 중입니다');
        break;
      case 'payments':
        alert('결제 내역 기능은 준비 중입니다');
        break;
      case 'support':
        alert('고객센터 기능은 준비 중입니다');
        break;
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return <MyPageScreen user={user} onMenuClick={handleMenuClick} />;
}
