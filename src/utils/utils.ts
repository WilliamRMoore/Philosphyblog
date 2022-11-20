export const debounce = (fn: (...args: any[]) => any, delay: number) => {
  let timer: any;
  return () => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(fn, delay);
  };
};

export const validateEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  return emailRegex.test(email.toLowerCase());
};

export const passwordStrength = (password: string) => {
  const strongPassword =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  const mediumPassword =
    /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

  let strengthScore = 1;
  if (strongPassword.test(password)) {
    strengthScore = 3;
  } else if (mediumPassword.test(password)) {
    strengthScore = 2;
  }
  return strengthScore;
};
