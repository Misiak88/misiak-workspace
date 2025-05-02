import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import session, { Store } from 'express-session';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger';
import { sessionStore } from './config/session';
import { AppDataSource } from './config/database';
import { healthRouter, welcomeRouter, authRouter } from './routes';

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      await AppDataSource.initialize();
      console.log("Database connection established");
    } catch (error) {
      console.error("Database initialization error:", error);
      process.exit(1);
    }
  }

  // Centralized middleware initialization.
  private initializeMiddlewares() {
    this.server.use(compression());
    this.server.use(loggerMiddleware);
    this.server.use(
      cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );

    // Configure session middleware with the session store and options.
    this.server.use(
      session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        store: sessionStore as unknown as Store,
        cookie: {
          maxAge: 120 * 1000, // Session expires after 2 minutes, only for tests
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        },
      })
    );

    // Enable JSON parsing for incoming request bodies.
    this.server.use(express.json());
  }

  // Modular routing initialization.
  private initializeRoutes() {
    this.server.use(authRouter);
    this.server.use(healthRouter);
    this.server.use(welcomeRouter);
  }

  // Global error handling middleware.
  private initializeErrorHandling() {
    this.server.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error("Unhandled error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  }
}
