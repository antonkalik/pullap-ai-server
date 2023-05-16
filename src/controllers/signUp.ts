import bcrypt from 'bcrypt';
import User from 'src/models/User';

export async function signUp(req, res) {
  const { email, password } = req.body;

  const user = await User.findBy({ email });

  if (!user) {
    return res.status(403).send({ message: 'Invalid email or password' });
  }

  await User.update(user.id, {
    password: await bcrypt.hash(password, 10),
  });

  res.status(200).send({ message: 'User created!' });
}
