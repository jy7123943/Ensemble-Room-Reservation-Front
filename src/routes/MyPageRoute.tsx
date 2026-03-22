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
        // API 실패 시 기본값
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return <MyPageScreen user={user} />;
}
