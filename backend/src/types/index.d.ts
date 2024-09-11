import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number }; // Customize this type based on your JWT payload structure
    }
  }
}
