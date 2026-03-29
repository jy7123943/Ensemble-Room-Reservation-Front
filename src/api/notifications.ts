import { apiFetch } from './client';
import type { NotificationSettings } from '../screens/NotificationSettingsScreen';

interface ApiNotificationSetting {
  id: string;
  user_id: string;
  reservation_alert: boolean;
  review_alert: boolean;
  marketing_alert: boolean;
}

function toSettings(api: ApiNotificationSetting): NotificationSettings {
  return {
    reservationAlert: api.reservation_alert,
    reviewAlert: api.review_alert,
    marketingAlert: api.marketing_alert,
  };
}

const TEMP_USER_ID = import.meta.env.VITE_TEMP_USER_ID as string;

export async function fetchNotificationSettings(): Promise<NotificationSettings> {
  const data = await apiFetch<ApiNotificationSetting>(
    `/notification-settings?userId=${TEMP_USER_ID}`,
  );
  return toSettings(data);
}

export async function updateNotificationSettings(
  settings: Partial<NotificationSettings>,
): Promise<NotificationSettings> {
  const data = await apiFetch<ApiNotificationSetting>(
    `/notification-settings?userId=${TEMP_USER_ID}`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        reservation_alert: settings.reservationAlert,
        review_alert: settings.reviewAlert,
        marketing_alert: settings.marketingAlert,
      }),
    },
  );
  return toSettings(data);
}
