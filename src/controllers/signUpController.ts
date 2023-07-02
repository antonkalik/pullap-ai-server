import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'src/helpers/validation/validate';
import { userSchema } from 'src/helpers/validation/schemas/userSchema';
import { UserType, UserModel } from 'src/models/UserModel';

type SignUpPayload = Omit<UserType, 'id' | 'created_at' | 'updated_at' | 'role' | 'status'>;

export async function signUpController(req, res) {
  const { email, password, first_name, last_name, country_code, phone, address }: SignUpPayload =
    req.body;

  const validation = validate<SignUpPayload>(req.body, userSchema);

  if (!validation.isValid) {
    return res.status(400).send(`Invalid ${validation.invalidKey}`);
  }

  const user = await UserModel.findBy({ email });

  if (user) {
    return res.status(403).send({ message: 'User already exist' });
  }

  const hashedPassword = (await bcrypt.hash(password, 10)) as string;
  const createdUser = await UserModel.create<SignUpPayload>({
    email,
    password: hashedPassword,
    first_name,
    last_name,
    country_code,
    phone,
    address
  });

  res.status(200).json({
    token: jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_SECRET as string
    ),
  });
}
