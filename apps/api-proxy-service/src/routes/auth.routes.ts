import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { AppDataSource } from '../config/database';

export const authRouter = Router();

authRouter.post('/auth/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Extract mobile, pin from the request body
  const { mobile, pin } = req.body || {};
  // Read apikey and API URL from .env
  const apiKey = process.env.APIKEY;
  const apiLoginUrl = process.env.API_LOGIN_URL;

  // Basic validation
  if (!mobile || !pin || !apiKey) {
    res.status(400).json({ error: 'Missing mobile, pin or apikey' });
    return;
  }

  if (req.session.loginkey) {
    console.log("Session already exists. Skipping external login API call.");
    res.json({
      message: 'Already logged in',
      userId: req.session.userId,
    });
    return;
  }

  try {
    // Call external login API
    const response = await axios.get(apiLoginUrl, {
      params: {
        apikey: apiKey,
        mobile,
        pin,
      },
    });

    // Store data in the session
    const { data } = response;
    const { user } = data;

    if (!user || !user.loginkey) {
      res.status(401).json({ error: 'Failed to obtain loginkey from external API' });
      return;
    }

    // Store loginkey and userId in the session
    req.session.loginkey = user.loginkey;
    req.session.userId = user.id;

    // Save session and update the user_id column in the database.
    await new Promise<void>((resolve, reject) => {
      req.session.save(async (err) => {
        if (err) return reject(err);
        try {
          await AppDataSource.query(
            `UPDATE sessions SET user_id = ? WHERE session_id = ?`,
            [req.session.userId, req.sessionID]
          );
          resolve();
        } catch (updateError) {
          reject(updateError);
        }
      });
    });

    // Return success response
    res.json({
      message: 'Login successful',
      userId: user.id,
    });
  } catch (err) {
    console.error('Error calling external login API:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});
