import { API_BASE_URL, ENDPOINTS, STORAGE_KEYS } from './constants';
import { apiRequest } from './apiManager';

interface AuthResponse {
  access_token: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export async function register(name: string, email: string, password: string): Promise<void> {
  await apiRequest<AuthResponse>(ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    body: { name, email, password },
  });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>(ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: { email, password },
  });
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
  return data;
}

export async function sendOtp(email: string, name?: string): Promise<void> {
  await apiRequest<{ message: string }>(ENDPOINTS.AUTH.OTP_SEND, {
    method: 'POST',
    body: { email, name },
  });
}

export async function verifyOtp(email: string, code: string): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>(ENDPOINTS.AUTH.OTP_VERIFY, {
    method: 'POST',
    body: { email, code },
  });
  storeAuthToken(data.access_token);
  return data;
}

export function initiateLinkedInAuth(): void {
  window.location.href = `${API_BASE_URL}${ENDPOINTS.AUTH.LINKEDIN}`;
}

export function storeAuthToken(token: string): void {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export async function getMe(): Promise<UserResponse> {
  return apiRequest<UserResponse>(ENDPOINTS.AUTH.ME);
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_DATA);
}
