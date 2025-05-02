import 'express-session';

declare module 'express-session' {
  interface SessionData {
    loginkey?: string;
    userId?: number;
  }
}
