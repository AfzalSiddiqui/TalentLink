export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    OTP_SEND: '/auth/otp/send-code',
    OTP_VERIFY: '/auth/otp/verify',
    LINKEDIN: '/auth/linkedin',
  },
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
};
