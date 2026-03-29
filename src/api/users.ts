import { apiFetch } from './client';

export interface User {
  id: string;
  tossUserId: string;
  nickname: string;
  phone: string;
  profileImageUrl: string;
  role: string;
}

interface ApiUser {
  id: string;
  toss_user_id: string;
  nickname: string;
  phone: string;
  profile_image_url: string;
  role: string;
}

function toUser(api: ApiUser): User {
  return {
    id: api.id,
    tossUserId: api.toss_user_id,
    nickname: api.nickname,
    phone: api.phone,
    profileImageUrl: api.profile_image_url,
    role: api.role,
  };
}

export async function fetchUser(id: string): Promise<User> {
  const data = await apiFetch<ApiUser>(`/users/${id}`);
  return toUser(data);
}

export async function updateUser(
  id: string,
  data: { nickname?: string; phone?: string },
): Promise<User> {
  const api = await apiFetch<ApiUser>(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      ...(data.nickname !== undefined && { nickname: data.nickname }),
      ...(data.phone !== undefined && { phone: data.phone }),
    }),
  });
  return toUser(api);
}