export default class Utils {
  static sleep(ms: number = 2000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
