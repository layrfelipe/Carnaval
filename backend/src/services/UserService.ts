import User from "../models/User";
import { EmptyBodyContent, UserDoesNotExist } from "../errors/BaseErrors";
import DatetimeHandler from "../utils/DatetimeHandler";

export default class UserService {
  public datetimeHandler = new DatetimeHandler()

  public async getAll() {
    const users = await User.find({}, "-password");
    return users;
  }

  public async getOne(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new UserDoesNotExist();
    return result;
  }

  public async update(id: string, user: IUserRegister) {
    if (!user) throw new EmptyBodyContent

    if (user.birthday) {
      user.birthday = this.datetimeHandler.handler(user.birthday)
    }

    const result = await User.updateOne({_id: id}, user);
    if (result.matchedCount == 0) throw new UserDoesNotExist();
    return user;
  }

  public async remove(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new UserDoesNotExist();
    const anotherResult = User.deleteOne({_id: id});
    return anotherResult;
  }
}