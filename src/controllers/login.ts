import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from 'src/models/User';

let users: { [key: string]: string } = {};

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findBy({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    const user = { name: email };
    const accessToken = jwt.sign(user, 'your_secret_key');
    res.status(200).json({ accessToken });
  } else {
    res.status(403).send({ message: 'Invalid email or password' });
  }
}
