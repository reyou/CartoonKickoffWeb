export default class Utils {
  static sleep(ms: number = 2000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static getPasswordStrength = (password: string): number => {
    let strength = 0;
    const minLength = 8;

    if (password.length >= minLength) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[\W_]/.test(password)) strength += 1;

    return strength;
  };

  static passwordStrengthMessage(strength: number) {
    switch (strength) {
      case 0:
        return '';
      case 1:
        return 'Very Weak';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return '';
    }
  }
}
