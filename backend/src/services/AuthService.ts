import "dotenv/config"
import User from "../models/User";
import { UsernameAlreadyInUse, EmailAlreadyInUse, PhoneAlreadyInUse, UserDoesNotExist, IncorrectPassword } from "../errors/BaseErrors";
import bcrypt from "bcrypt"
import DatetimeHandler from "../utils/DatetimeHandler";
import Authentication from "../classes/Authentication";
import RefreshToken from "../models/RefreshToken";

export default class AuthService extends Authentication {
  public datetimeHandler = new DatetimeHandler();

  public async create(user: IUserRegister) {
      const usernameExists = await User.findOne({username: user.username});
      if (usernameExists) throw new UsernameAlreadyInUse();

      const emailExists = await User.findOne({email: user.email});
      if (emailExists) throw new EmailAlreadyInUse();

      const phoneExists = await User.findOne({phone: user.phone});
      if (phoneExists) throw new PhoneAlreadyInUse();

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(user.password, salt);

      user.password = "";

      const newBirthday = this.datetimeHandler.handler(user.birthday);

      const newUser = await User.create({
        username: user.username,
        email: user.email,
        password: passwordHash,
        name: user.name,
        phone: user.phone,
        birthday: newBirthday,
        role: user.role,
        loc: user.loc,
      });

      const safeNewUserData = { username: newUser.username, _id: newUser._id }

      const token = this.generateAcessToken({ id: newUser._id })

      return { safeNewUserData, token }
  }
  
  public async login(credentials: IUserLogin) {
    const userExists = await User.findOne({ username: credentials.username });
    if (!userExists) throw new UserDoesNotExist();

    const checkPassword = await bcrypt.compare(credentials.password, userExists!.password);
    if (!checkPassword) throw new IncorrectPassword();

    credentials.password = "";

    const acessToken = this.generateAcessToken({ id: userExists._id });
    const refreshToken = this.generateRefreshToken({ id: userExists._id });

    const newRefreshToken = await RefreshToken.create({
      token: refreshToken
    });

    return { userExists, acessToken, refreshToken };
  }

  public async token(tokenData: any) {
    const acessToken = this.generateAcessToken({ _id: tokenData.id })
    return acessToken;
  }

  public async logout(acessToken: string) {
    await RefreshToken.deleteMany({ token: { $ne: acessToken }})
  }
}