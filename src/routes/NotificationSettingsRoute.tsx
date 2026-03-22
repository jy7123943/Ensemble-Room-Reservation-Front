import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNotificationSettings, updateNotificationSettings } from '../api/notifications';
import {
  NotificationSettingsScreen,
  type NotificationSettings,
} from '../screens/NotificationSettingsScreen';

export default function NotificationSettingsRoute() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>({
    reservationAlert: true,
    reviewAlert: true,
    marketingAlert: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotificationSettings()
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (key: keyof NotificationSettings) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    try {
      await updateNotificationSettings(updated);
    } catch {
      setSettings(settings);
    }
  };

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>로딩 중...</p>;

  return (
    <NotificationSettingsScreen
      settings={settings}
      onToggle={handleToggle}
      onBack={() => navigate('/mypage')}
    />
  );
}
