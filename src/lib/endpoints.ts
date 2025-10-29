const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/login`,
    google: `${BASE_URL}/google_oauth`,
    signup: `${BASE_URL}/signup`,
    logout: `${BASE_URL}/logout`,
  },

  user: {
    profile: `${BASE_URL}/profile`,
    update_profile: `${BASE_URL}/update_profile`,
    update_password: `${BASE_URL}/update_password`,
    delete_profile: `${BASE_URL}/delete_profile`,
  },
};
