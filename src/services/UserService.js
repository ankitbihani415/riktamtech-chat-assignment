import { genSaltSync, hashSync } from 'bcrypt';
import User from '../models/user';

export default class UserService {
  constructor() { }

  async create(request) {
    const salt = genSaltSync(10);
    const hash = hashSync(request.body.password, salt);
    const body = {
      phone: request.body.phone,
      password: hash
    }
    const user = await User.create(body);
    return {
      status: "success",
      message: "User Created successfully",
      data: user
    };
  }

  async update(request) {
    const user = await User.findById(request.params.id);
    if (!user) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User Not Found with phone number"],
      };
    }
    const body = request.body;
    if (body.password) {
      const salt = genSaltSync(10);
      const hash = hashSync(body.password, salt);
      body.password = hash;
    }
    if (body.phone) {
      body.phone_verified_at = null;
    }
    if (body.email) {
      body.email_verified_at = null;
    }
    await user.save();
    return {
      status: "success",
      message: "User Updated successfully",
      data: user
    };
  }

  async list(request) {
    const users = await User.find({ type: { $eq: 'user' }, _id: { $ne: request.auth_user._id } });
    if (!users) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User Not Found"],
      };
    }
    return {
      status: "success",
      message: "Users found successfully",
      data: users
    };
  }
}
