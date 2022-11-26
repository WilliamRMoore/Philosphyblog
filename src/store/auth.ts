import { AuthError, User } from '@supabase/supabase-js';
import { login, logout, getUser, getUserWithToken } from '../api/auth';
import { SetupNav } from '../nav';

const state = {
  user: null as User | null,
  error: null as AuthError | null,
  loggedIn: false as boolean,
};

export const authStore = {
  LOGIN: async (email: string, password: string) => {
    const { user, session } = await login(email, password);
    if (user) {
      state.user = user;
      state.loggedIn = true;
      localStorage.setItem('blog_uid', user.id);
      localStorage.setItem('blog_utk', session!.access_token);
      localStorage.setItem('blog_rtk', session!.refresh_token);
      alert('Login Successful!');
      SetupNav();
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
      SetupNav();
    } else {
      state.error = res;
      console.log(state.error);
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
      state.error = res.error;
      console.log(state.error);
    } else {
      state.user = res.data.user;
      state.loggedIn = true;
      console.log(res);
      SetupNav();
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
      return state.error;
    },
  },
};
