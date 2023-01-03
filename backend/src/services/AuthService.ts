// MY IMPORTS
import "dotenv/config"
import User from "../models/User";
import * as errorsHandler from "../errors/BaseErrors";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// DB ACCESS LAYER
export default class AuthService {

  // OPERATIONS
  async create(user: IUserRegister) {
      const userExists = await User.findOne({email: user.email});
      if (userExists) throw new errorsHandler.UserAlreadyExistsError();

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(user.password, salt);

      const result = await User.create({username: user.username, email: user.email, password: passwordHash});
      return result;
  }
  
  async login(credentials: IUserLogin) {
    const userExists = await User.findOne({username: credentials.username});
    if (!userExists) throw new errorsHandler.UserDoesNotExist();

    const checkPassword = await bcrypt.compare(credentials.password, userExists!.password);
    console.log()
    console.log(checkPassword)
    console.log()
    if (!checkPassword) throw new errorsHandler.IncorrectPassword();

    const secret = encodeURIComponent(process.env.SECRET!);
    console.log("aqui", secret)
    const token = jwt.sign({id: userExists!._id}, secret)

    return token;
  }
}