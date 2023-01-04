import "dotenv/config"
import User from "../models/User";
import { UsernameAlreadyInUse, EmailAlreadyInUse, PhoneAlreadyInUse, UserDoesNotExist, IncorrectPassword } from "../errors/BaseErrors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dateAndTimeHandler from "../utils/datetimeHandler";

export default class AuthService {

  async create(user: IUserRegister) {
      const usernameExists = await User.findOne({username: user.username});
      if (usernameExists) throw new UsernameAlreadyInUse();

      const emailExists = await User.findOne({email: user.email});
      if (emailExists) throw new EmailAlreadyInUse();

      const phoneExists = await User.findOne({phone: user.phone});
      if (phoneExists) throw new PhoneAlreadyInUse();

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(user.password, salt);

      user.password = "";
      const formattedBirthday = dateAndTimeHandler(user.birthday)

      const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: passwordHash,
        name: user.name,
        phone: user.phone,
        birthday: formattedBirthday,
        role: user.role,
        loc: user.loc,
      });

      const safeNewUserData = { username: newUser.username, _id: newUser._id }

      const token = this.generateAcessToken({ id: newUser._id })

      return { safeNewUserData, token }
  }
  
  async login(credentials: IUserLogin) {
    const userExists = await User.findOne({ username: credentials.username });
    if (!userExists) throw new UserDoesNotExist();

    const checkPassword = await bcrypt.compare(credentials.password, userExists!.password);
    if (!checkPassword) throw new IncorrectPassword();

    credentials.password = "";

    const token = this.generateAcessToken({ id: userExists._id })

    return { userExists, token };
  }

  generateAcessToken(params={}) {
    return jwt.sign(params, encodeURIComponent(process.env.ACESS_TOKEN_SECRET!), { expiresIn: 86400 });
  }
}