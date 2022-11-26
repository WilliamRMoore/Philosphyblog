import { getElById } from '../helpers/htmlFuncs';
import { authStore } from '../store/auth';

async function handleLoginSubmit() {
  const email = (getElById('login-email') as HTMLInputElement).value;
  const password = (getElById('login-password') as HTMLInputElement).value;
  await authStore.LOGIN(email, password);
}

function setLoginListeners() {
  getElById('login-submit')?.removeEventListener('click', handleLoginSubmit);
  getElById('login-submit')?.addEventListener('click', handleLoginSubmit);
}

export default function initLogin() {
  setLoginListeners();
}
