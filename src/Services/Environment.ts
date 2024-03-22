import { EnvironmentKind } from './EnvironmentKind';

export default class Environment {
  static getEndpoint(path: string) {
    const endpoint =
      Environment.getType() === EnvironmentKind.Development
        ? `http://localhost:5281/${path}`
        : `https://api.cartoonkickoff.com/${path}`;
    return endpoint;
  }
  static getType(): EnvironmentKind {
    switch (process.env.NODE_ENV) {
      case 'development':
        return EnvironmentKind.Development;
      case 'test':
        return EnvironmentKind.Test;
      default:
        return EnvironmentKind.Production;
    }
  }
}
