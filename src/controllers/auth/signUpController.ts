import bcrypt from 'bcrypt';
import { jwt } from 'src/utils/jwt';
import { Request, Response } from 'express';
import { validate } from 'src/helpers/validation/validate';
import { userSchema } from 'src/helpers/validation/schemas/userSchema';
import { UserModel } from 'src/models/UserModel';
import { Redis } from 'src/redis/Redis';
import { InvalidRequestError } from 'src/constants/errors';
import type { User } from 'src/@types';

type Payload = Omit<User, 'id' | 'created_at' | 'updated_at' | 'role'>;

export async function signUpController(req: Request, res: Response) {
  const { email, password, first_name, last_name }: Payload = req.body;
  const validation = validate<Payload>(req.body, userSchema);

  if (!validation.isValid) {
    return res.status(400).send(`Invalid ${validation.invalidKey}`);
  }

  try {
    const user = await UserModel.findOneBy({ email });

    if (user) {
      return res.status(403).send({ message: InvalidRequestError });
    }

    const hashedPassword = (await bcrypt.hash(password, 10)) as string;
    const createdUser = await UserModel.create<Payload>({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      username: `${first_name}_${last_name}_${Date.now()}`.toLowerCase(),
    });
    const token = await jwt.sign({
      id: createdUser.id,
    });
    await Redis.setSession(createdUser.id, token);

    res.status(200).json({
      token,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
}
