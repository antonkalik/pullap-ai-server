import { redisClient } from 'src/redis/index';

export class Redis {
  public static setSession(userId: number, token: string) {
    if (!userId) throw new Error('userId is required');
    if (!token) throw new Error('token is required');
    return redisClient.set(`session:${userId}`, token);
  }

  public static getSession(userId: number) {
    if (!userId) throw new Error('userId is required');
    return redisClient.get(`session:${userId}`);
  }

  public static deleteSession(userId: number) {
    if (!userId) throw new Error('userId is required');
    return redisClient.del(`session:${userId}`);
  }
}
