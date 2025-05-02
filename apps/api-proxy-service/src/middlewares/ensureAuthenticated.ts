import { Request, Response, NextFunction } from "express";

// Middleware to ensure the user is authenticated.
export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  console.log("ensureAuthenticated - session:", req.session);
  if (!req.session || !req.session.loginkey) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
}
