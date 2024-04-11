import Group from '../models/group';
import GroupMember from '../models/groupMember';
import Message from '../models/message';

export default class GroupService {
  constructor() { }

  async list() {
    const groups = await Group.find();
    return {
      status: "success",
      message: "Groups fetched successfully",
      data: groups
    }
  }
  async show(req) {
    const group = (await Group.findById(req.params.id)).toObject();
    if (!group) {
      return {
        status: "fail",
        message: "Group Not Found",
      };
    }
    const members = await GroupMember.find({ group_id: req.params.id });
    const messages = await Message.find({ group_id: req.params.id });
    group.members = members;
    group.messages = messages;
    return {
      status: "success",
      message: "Group found successfully",
      data: group
    };
  }

  async destory(req) {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) {
      return {
        status: "fail",
        message: "Group Not Found",
      };
    }
    await GroupMember.deleteMany({ group_id: req.params.id });
    await Message.deleteMany({ group_id: req.params.id });
    return {
      status: "success",
      message: "Group deleted successfully"
    };
  }

  async create(req) {
    const group = (await Group.create({ name: req.body.name, created_by: req.auth_user._id })).toObject();
    const members = await GroupMember.create({ group_id: group._id, user_id: req.auth_user._id });
    group.members = [members];
    return {
      status: "success",
      message: "Group Created successfully",
      data: group
    };
  }

  async update(req) {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return {
        status: "fail",
        message: "Group Not Found",
      };
    }
    group.name = req.body.name;
    await group.save();
    return {
      status: "success",
      message: "Group updated successfully",
      data: group
    };
  }
}
