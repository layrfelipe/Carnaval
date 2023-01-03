import "dotenv/config"
import User from "../models/User";
import * as errorsHandler from "../errors/BaseErrors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default class AuthService {
  async create(user: IUserRegister) {
      const emailExists = await User.findOne({email: user.email});
      if (emailExists) throw new errorsHandler.EmailAlreadyInUse();

      const usernameExists = await User.findOne({username: user.username});
      if (usernameExists) throw new errorsHandler.UsernameAlreadyInUse();

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(user.password, salt);

      const result = await User.create({username: user.username, email: user.email, password: passwordHash});

      const acessToken = jwt.sign({id: result._id}, encodeURIComponent(process.env.SECRET!))

      return {result, acessToken};
  }
  
  async login(credentials: IUserLogin) {
    const userExists = await User.findOne({username: credentials.username});
    if (!userExists) throw new errorsHandler.UserDoesNotExist();

    const checkPassword = await bcrypt.compare(credentials.password, userExists!.password);
    if (!checkPassword) throw new errorsHandler.IncorrectPassword();

    const acessToken = jwt.sign({id: userExists!._id}, encodeURIComponent(process.env.SECRET!))

    return acessToken;
  }
}