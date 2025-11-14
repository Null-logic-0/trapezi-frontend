const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/login`,
    google: `${BASE_URL}/google_oauth`,
    signup: `${BASE_URL}/signup`,
    logout: `${BASE_URL}/logout`,
    reset_password_request: `${BASE_URL}/password_reset_request`,
    reset_password: `${BASE_URL}/password_reset`,
  },

  user: {
    profile: `${BASE_URL}/profile`,
    update_profile: `${BASE_URL}/update_profile`,
    update_password: `${BASE_URL}/update_password`,
    delete_profile: `${BASE_URL}/delete_profile`,
    my_places: `${BASE_URL}/my_businesses`,
    create_place: `${BASE_URL}/food_places`,
    update_place: `${BASE_URL}/food_places`,
    delete_place: `${BASE_URL}/food_places`,
  },

  places: {
    all: `${BASE_URL}/food_places`,
    one: `${BASE_URL}/food_places`,
    vip: `${BASE_URL}/vip_places`,
    favorite_places: `${BASE_URL}/favorites`,
    toggle_favorite: `${BASE_URL}/favorite`,
    reviews: `${BASE_URL}/reviews`,
    create_review: `${BASE_URL}/reviews`,
    update_review: `${BASE_URL}/reviews`,
    delete_review: `${BASE_URL}/reviews`,
    search_places: `${BASE_URL}/search_places`,
  },
};
