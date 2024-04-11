import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
const messageSchema = new Schema({
  name: {
    type: String,
  },
  group_id: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  liked_by: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, {
  timestamps: true
});

export default model('message', messageSchema);
