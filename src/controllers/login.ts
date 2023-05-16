import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from 'src/models/User';

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findBy({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(403).send({ message: 'Invalid email or password' });
  }
}
