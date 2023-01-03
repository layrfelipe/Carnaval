// MY IMPORTS
import User from "../models/User";
import * as errorsHandler from "../errors/BaseErrors";

// DB ACCESS LAYER
export default class UserService {

  async getAll() {
    const users = await User.find({}, "-password");
    return users;
  }

  async getOne(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new errorsHandler.UserDoesNotExist();
    return result;
  }

  async update(id: string, user: IUserRegister) {
    const result = await User.updateOne({_id: id}, user);
    if (!result) throw new errorsHandler.UserDoesNotExist();
    return result;
  }

  async remove(id: string) {
    const result = await User.findOne({_id: id}, "-password");
    if (!result) throw new errorsHandler.UserDoesNotExist();
    const anotherResult = User.deleteOne({_id: id});
    return anotherResult;
  }
}