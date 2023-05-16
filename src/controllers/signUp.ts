import bcrypt from 'bcrypt';

let users: { [key: string]: string } = {};

export async function signUp(req, res) {
  const { email, password } = req.body;

  users[email] = await bcrypt.hash(password, 10);
  res.status(200).send({ message: 'User created!' });
}
