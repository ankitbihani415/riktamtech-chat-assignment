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
      user.password = hash;
    }
    if (body.phone) {
      user.phone = body.phone;
      user.phone_verified_at = null;
    }
    if (body.email) {
      user.email = body.email;
      user.email_verified_at = null;
    }
    if (body.name) {
      user.name = body.name;
    }
    if (body.blocked) {
      user.blocked = body.blocked;
    }
    if (body.type) {
      user.type = body.type;
    }
    await user.save();
    return {
      status: "success",
      message: "User Updated successfully",
      data: user
    };
  }

  async list(request) {
    const filter = {
      _id: { $ne: request.auth_user._id },
    };
    if (request.auth_user.type === 'user') {
      filter.type = { $eq: 'user' };
      filter.blocked =  { $eq: false };
      filter.email_verified_at =  { $ne: null };
      filter.phone_verified_at =  { $ne: null };
    }
    const users = await User.find(filter);
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
