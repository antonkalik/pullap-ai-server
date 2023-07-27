require('dotenv').config({
  path: '../../.env',
});
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel, UserType } from 'src/models/UserModel';

type SignInPayload = {
  email: string;
};

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  console.log("email", email);
  console.log("password", password);

  if (!email || !password) {
    return res.status(403).send({ message: 'Invalid email or password' });
  }

  try {
    const user = await UserModel.findBy<SignInPayload, UserType>({ email });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(403).send({ message: 'Invalid email or password' });
      }

      const token: string = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      return res.status(403).send({ message: 'Invalid email or password' });
    }
  } catch(error) {
    console.error("SERVER_ERROR", error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
}
