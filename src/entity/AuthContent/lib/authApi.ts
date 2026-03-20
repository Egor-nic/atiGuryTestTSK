import { AUTH_LOGIN_URL } from './constants';

export type AuthResponse = {
  accessToken?: string;
  message?: string;
};

export async function loginRequest(
  username: string,
  password: string,
  expiresInMins: number
): Promise<AuthResponse> {
  const res = await fetch(AUTH_LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins })
  });

  let payload: AuthResponse = {};
  try {
    payload = (await res.json()) as AuthResponse;
  } catch (_e) {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    throw new Error(payload.message ?? 'Не удалось авторизоваться');
  }

  return payload;
}

