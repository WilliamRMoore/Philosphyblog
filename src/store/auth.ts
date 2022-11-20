import { AuthError, User } from '@supabase/supabase-js';
import { login, logout, getUser, getUserWithToken } from '../api/auth';

const state = {
  user: {} as User | null,
  error: {} as AuthError | null,
  loggedIn: false as boolean,
};

export const storeFunc = {
  LOGIN: async (email: string, password: string) => {
    const { user, session } = await login(email, password);
    if (user) {
      state.user = user;
      state.loggedIn = true;
      localStorage.setItem('blog_uid', user.id);
      localStorage.setItem('blog_utk', session!.access_token);
      localStorage.setItem('blog_rtk', session!.refresh_token);
    }
  },
  LOGOUT: async () => {
    const res = await logout();
    if (!res) {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem('blog_uid');
      localStorage.removeItem('blog_utk');
      localStorage.removeItem('blog_rtk');
    }
  },
  GET_USER: async () => {
    const userToken = localStorage.getItem('blog_utk')
      ? localStorage.getItem('blog_utk')
      : null;
    const res =
      userToken != null ? await getUserWithToken(userToken) : await getUser();
    if (res.error) {
      localStorage.removeItem('blog_utk');
      localStorage.removeItem('blog_rtk');
    } else {
      state.user = res.data.user;
    }
  },
  Getters: {
    user: () => {
      return state.user;
    },
    loginStatus: () => {
      return state.loggedIn;
    },
    error: () => {
      state.error;
    },
  },
};
