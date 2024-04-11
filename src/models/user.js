import { Schema as _Schema, model } from 'mongoose';
import { randomInt } from '../helpers/HelperFunctions';

const Schema = _Schema;
const userSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  password: String,
  phone: String,
  phone_verification_code: {
    type: Number,
    default: randomInt()
  },
  phone_verified_at: {
    type: Date,
    default: null
  },
  email: String,
  email_verification_code: {
    type: Number,
    default: randomInt()
  },
  email_verified_at: {
    type: Date,
    default: null
  },
  type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  blocked: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

export default model('user', userSchema);
