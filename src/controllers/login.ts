import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User, UserType } from 'src/models/User';

type SignInPayload = {
  email: string;
};

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(403).send({ message: 'Invalid email or password' });
  }

  try {
    const user = await User.findBy<SignInPayload, UserType>({ email });

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
        process.env.JWT_SECRET as string
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
