
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  export function validatePassword(password) {
    // At least 6 characters, at least one letter and one number, allow any characters
    const re = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    return re.test(password);
  }