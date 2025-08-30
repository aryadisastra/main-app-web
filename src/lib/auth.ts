const TOKEN_KEY = "jwt_token";
const PROFILE_KEY = "profile";

export const authStore = {
  get token(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  set token(v: string | null) {
    if (typeof window === "undefined") return;
    v ? localStorage.setItem(TOKEN_KEY, v) : localStorage.removeItem(TOKEN_KEY);
  },
  get profile(): any | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  set profile(p: any | null) {
    if (typeof window === "undefined") return;
    p ? localStorage.setItem(PROFILE_KEY, JSON.stringify(p)) : localStorage.removeItem(PROFILE_KEY);
  },
  clear() {
    this.token = null;
    this.profile = null;
  },
};