/* eslint-disable no-console */
import { genSaltSync, hashSync } from 'bcrypt';
import User from '../src/models/user';
import Group from '../src/models/group';
import GroupMember from '../src/models/groupMember';
import Message from '../src/models/message';

export async function adminSeed() {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync('12345678', salt);
    const data = {
      name: 'Admin',
      phone: '9174133789',
      password: hash,
      phone_verified_at: Date.now(),
      email_verified_at: Date.now(),
      phone_verification_code: null,
      email_verification_code: null,
      type: 'admin',

    };
    const filter = { phone: data.phone };
    const options = { upsert: true, new: true };

    await User.findOneAndUpdate(filter, data, options);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

export async function userSeed() {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync('12345678', salt);
    const commonUserData = {
      password: hash,
      phone_verified_at: Date.now(),
      email_verified_at: Date.now(),
      phone_verification_code: null,
      email_verification_code: null,
      type: 'user',
    }
    const data = [
      {
        name: 'User 1',
        phone: '9174133788',
        ...commonUserData
      },
      {
        name: 'User 2',
        phone: '9174133787',
        ...commonUserData
      },
      {
        name: 'User 3',
        phone: '9174133786',
        ...commonUserData
      }
    ];

    const bulkOps = data.map(doc => ({
      updateOne: {
        filter: { phone: doc.phone }, // Use existing _id or generate new ObjectId
        update: { $set: doc },
        upsert: true, // Create document if not found
      },
    }));
    await User.bulkWrite(bulkOps);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

export async function clearTestDB() {
  try {
    await User.deleteMany({});
    await Group.deleteMany({});
    await GroupMember.deleteMany({});
    await Message.deleteMany({});
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}

export async function listSeedUser() {
  try {
    const users = await User.find({phone:{$in:['9174133788', '9174133787', '9174133786']}});
    return users;
  } catch (error) {
    console.error('Error fetching seed data:', error);
  }
}