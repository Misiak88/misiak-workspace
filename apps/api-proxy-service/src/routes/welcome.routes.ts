import { Router } from 'express';

export const welcomeRouter = Router();

// Welcome, Endpoint
welcomeRouter.get('/welcome', (req, res) => {
  res.send({ message: 'Welcome to ops-tools-proxy-service!' });
});
