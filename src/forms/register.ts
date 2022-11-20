import { getElById } from '../helpers/htmlFuncs';
import { validateEmail, passwordStrength } from '../utils/utils';
import { register } from '../api/auth';

function setRegisterListener() {
  getElById('register-submit')?.removeEventListener('click', handleSubmit);
  getElById('register-submit')?.addEventListener('click', handleSubmit);
}

async function handleSubmit(e: Event) {
  const email = (getElById('register-email') as HTMLInputElement).value;
  const password = (getElById('register-password') as HTMLInputElement).value;
  const confPassword = (
    getElById('register-confirm-password') as HTMLInputElement
  ).value;

  if (email && password && confPassword) {
    const valid = validateForm(email, password, confPassword);
    if (valid) {
      const res = await register(email, password);
      alert(
        res.error != null
          ? 'Registration failed'
          : 'Registration successful, please check you email.'
      );
    }
  } else {
    alert(
      "Something went wrong! Check the form and make sure it's filled out!"
    );
  }
}

function initRegister() {
  setRegisterListener();
}

function validateForm(email: string, password: string, confPassword: string) {
  const emailValid = validateEmail(email);
  const passStrength = passwordStrength(password);
  let valid = true;

  if (!emailValid) {
    getElById('register-email-error')?.classList.remove('hide');
    valid = false;
  }

  if (passStrength < 2) {
    getElById('register-password-error')?.classList.remove('hide');
    getElById('register-conf-password-error')?.classList.remove('hide');
    valid = false;
  }

  if (password !== confPassword) {
    getElById('register-nonmatch-password-error')?.classList.remove('hide');
    valid = false;
  }
  return valid;
}

export default initRegister;
