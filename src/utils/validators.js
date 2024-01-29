export const isValidEmail = (email) => {
  if (!email) {
    return false;
  }
  let hasError = false;
  if (email && email.includes("@")) {
    hasError = !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(email);
  }
  return hasError;
};

export const isValidPassword = (password) => {
  if (!password) {
    return false;
  }
  let hasError = false;
  if (password) {
    hasError = /^(?=.*\d)(?=.*[A-Z]).{8,}$/.test(password);
  }
  return hasError;
};
