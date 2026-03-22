import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUser, updateUser } from '../api/users';
import type { User } from '../api/users';
import { EditProfileScreen } from '../screens/EditProfileScreen';

const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export default function EditProfileRoute() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(TEMP_USER_ID)
      .then((u) => {
        setUser(u);
        setNickname(u.nickname);
        setPhone(u.phone ?? '');
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUser(user.id, { nickname, phone });
      navigate('/mypage', { replace: true });
    } catch {
      alert('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;
  if (!user) return <p style={{ padding: 20, textAlign: 'center' }}>사용자 정보를 불러올 수 없습니다.</p>;

  return (
    <EditProfileScreen
      user={user}
      nickname={nickname}
      phone={phone}
      saving={saving}
      onNicknameChange={setNickname}
      onPhoneChange={setPhone}
      onSave={handleSave}
      onBack={() => navigate('/mypage')}
    />
  );
}
