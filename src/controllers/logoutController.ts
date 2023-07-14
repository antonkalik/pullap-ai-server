import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel, UserType } from 'src/models/UserModel';
import { redisClient } from 'src/redis';
import type { Request, Response } from 'express';

export async function logoutController(req: Request, res: Response) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  const user = jwt.verify(token, process.env.JWT_SECRET as string) as UserType;
  if (!user) return res.sendStatus(403);

  try {
    await redisClient.del(user.id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
