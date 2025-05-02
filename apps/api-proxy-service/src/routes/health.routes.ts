import express, { Router } from 'express';

export const healthRouter = express.Router();

// Simple Health-check

/**
 * TODO: Integrate health endpoint with Kubernetes
 * - Enhance the health check by verifying database connectivity.
 * - Return a 200 status only if all checks pass; otherwise return an appropriate error status.
 */
healthRouter.get('/health', (req, res) => {
  res.send({ message: 'Alive' });
});
