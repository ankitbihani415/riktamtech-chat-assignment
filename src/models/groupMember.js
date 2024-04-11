import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
const groupMemberSchema = new Schema({
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
});

export default model('group_member', groupMemberSchema);
