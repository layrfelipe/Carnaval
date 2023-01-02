// MY IMPORTS
import User from "../models/User";

// DB ACCESS LAYER
export default class UserService {

  // OPERATIONS
  async create(user: IUser) {
      return await User.create(user)
  }

  async getAll() {
    return await User.find()
  }

  async getOne(id: string) {
    return await User.findOne({_id: id})
  }

  async update(id: string, user: IUser) {
    return await User.updateOne({_id: id}, user)
  }

  async remove(id: string) {
    await User.deleteOne({_id: id})
  }
}