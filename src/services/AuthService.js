import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import { randomInt } from '../helpers/HelperFunctions';

export default class AuthService {
  constructor() { }

  async login(request) {
    const user = await User.findOne({ phone: request.body.phone });
    if (!user) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User Not Found with phone number"],
      };
    }
    const comparePwd = compareSync(request.body.password, user.password);
    if (!comparePwd) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["Wrong Password"],
      };
    }
    if (user.blocked) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User blocked"],
      };
    }
    if (!user.phone_verified_at) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["Please Verify Phone"],
      };
    }
    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 8640000, // 86400 expires in 24 hours
    });
    return {
      status: "success",
      message: "User Logged In successfully",
      data: {
        user,
        token,
      }
    };
  }

  async verifyPhone(request) {
    const user = await User.findOne({ phone: request.body.phone });

    if (!user) {
      return {
        status: "fail",
        message: "User Not Found with phone number",
      };
    }

    if (user.blocked) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User blocked"],
      };
    }

    if (user.phone_verified_at) {
      return {
        status: "fail",
        message: "Phone Already Verified",
      };
    }

    if (user.phone_verification_code != request.body.phoneVerificationCode) {
      return {
        status: "fail",
        message: "Phone Verification Code not matched",
      };
    }

    user.phone_verification_code = null;
    user.phone_verified_at = Date.now();
    await user.save();

    return {
      status: "success",
      message: "Phone Verified successfully",
    };
  }

  async resendPhoneVerificationCode(request) {
    const user = await User.findOne({ phone: request.params.phone });

    if (!user) {
      return {
        status: "fail",
        message: "User Not Found with phone number",
      };
    }

    if (user.blocked) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User blocked"],
      };
    }

    if (user.phone_verified_at) {
      return {
        status: "fail",
        message: "Phone Already Verified",
      };
    }

    user.phone_verification_code = randomInt();
    await user.save();

    return {
      status: "success",
      message: "Phone Verification Code send successfully",
    };
  }

  async verifyEmail(request) {
    const user = await User.findOne({ email: request.body.email });

    if (!user) {
      return {
        status: "fail",
        message: "User Not Found with email number",
      };
    }

    if (user.blocked) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User blocked"],
      };
    }

    if (user.email_verified_at) {
      return {
        status: "fail",
        message: "Email Already Verified",
      };
    }

    if (user.email_verification_code != request.body.emailVerificationCode) {
      return {
        status: "fail",
        message: "Email Verification Code not matched",
      };
    }

    user.email_verification_code = null;
    user.email_verified_at = Date.now();
    await user.save();

    return {
      status: "success",
      message: "Email Verified successfully",
    };
  }

  async resendEmailVerificationCode(request) {
    const user = await User.findOne({ email: request.params.email });

    if (!user) {
      return {
        status: "fail",
        message: "User Not Found with email number",
      };
    }

    if (user.blocked) {
      return {
        status: "fail",
        message: "Bad Request",
        errors: ["User blocked"],
      };
    }

    if (user.email_verified_at) {
      return {
        status: "fail",
        message: "Email Already Verified",
      };
    }

    user.email_verification_code = randomInt();
    await user.save();

    return {
      status: "success",
      message: "Email Verification Code send successfully",
    };
  }
}
