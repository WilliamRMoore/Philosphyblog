import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import supaBase from '../Supabase';

export const login = async (email: string, password: string) => {
  const {
    data: { user, session },
    error,
  } = await supaBase.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  }
  return { user, session };
};

export const logout = async () => {
  const response = await supaBase.auth.signOut();

  if (response.error) {
    alert(response.error);
    return response.error;
  }
};

export const register = async (
  email: string,
  password: string,
  userData: Object | null = null
) => {
  const options = { userData };
  const user = { email, password, options } as SignUpWithPasswordCredentials;
  const { data, error } = await supaBase.auth.signUp(user);
  if (error) {
    alert(error.message);
  }
  return { data, error };
};

export const getUser = async () => {
  const { data, error } = await supaBase.auth.getUser();
  if (error) {
    alert(error.message);
  }
  return { data, error };
};

export const getUserWithToken = async (token: string) => {
  const { data, error } = await supaBase.auth.getUser(token);
  if (error) {
    alert(error.message);
  }
  return { data, error };
};
