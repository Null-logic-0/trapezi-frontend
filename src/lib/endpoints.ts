const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const ENDPOINTS = {
    auth: {
        login: `${BASE_URL}/login`,
        google: `${BASE_URL}/google_oauth`,
        signup: `${BASE_URL}/signup`,
        logout: `${BASE_URL}/logout`,
        profile: `${BASE_URL}/profile`,
    },

    users: {
        all: `${BASE_URL}/users`,

    }
}