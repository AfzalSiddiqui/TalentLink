import { API_BASE_URL, STORAGE_KEYS } from './constants';
import { checkConnectivity, NetworkError } from './offlineHandler';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  checkConnectivity();

  const { method = 'GET', body, headers = {} } = options;

  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new NetworkError();
  }

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || 'Something went wrong. Please try again.';
    throw new Error(message);
  }

  return data as T;
}
