import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;
const groupSchema = new Schema({
  name: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
});

export default model('group', groupSchema);
