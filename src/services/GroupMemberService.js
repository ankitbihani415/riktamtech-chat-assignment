import Group from '../models/group';
import GroupMember from '../models/groupMember';

export default class GroupService {
  constructor() { }

  async destory(req) {
      const group = await GroupMember.findByIdAndDelete(req.params.id);
      if (!group) {
        return {
          status: "fail",
          message: "Group Member Not Found",
        };
      }
      return {
        status: "success",
        message: "Group member deleted successfully"
      };
  }

  async create(req) {
      const group = await Group.findById(req.body.groupId);
      if (!group) {
        return {
          status: "fail",
          message: "Group Not Found",
        };
      }
      const checkMember = await GroupMember.findOne({ group_id: req.body.groupId, user_id: req.body.userId });
      if (checkMember) {
        return {
          status: "fail",
          message: "Member already added",
        };
      }
      await GroupMember.create({ group_id: req.body.groupId, user_id: req.body.userId });
      return {
        status: "success",
        message: "Member Added Successfull"
      }
  }
}
