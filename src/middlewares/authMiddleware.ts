import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

type UserJWT = {
  id: string;
  email: string;
};

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (error, user) => {
    if (error) return res.sendStatus(403);
    req['user'] = user as UserJWT;
    next();
  });
}
