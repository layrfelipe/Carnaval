import User from "../models/User";
import { EmptyBodyContent, UserDoesNotExist } from "../errors/BaseErrors";
import dateAndTimeHandler from "../utils/datetimeHandler";

export default class UserService {

  async getAll() {
    const users = await User.find({}, "-password");
    return users;
  }

  async getOne(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new UserDoesNotExist();
    return result;
  }

  async update(id: string, user: IUserRegister) {
    if (!user) throw new EmptyBodyContent

    if (user.birthday) user.birthday = dateAndTimeHandler(user.birthday)

    const result = await User.updateOne({_id: id}, user);
    if (result.matchedCount == 0) throw new UserDoesNotExist();
    return user;
  }

  async remove(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new UserDoesNotExist();
    const anotherResult = User.deleteOne({_id: id});
    return anotherResult;
  }
}