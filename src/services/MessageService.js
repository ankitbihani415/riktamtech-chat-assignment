import Message from '../models/message';

export default class GroupService {
  constructor() { }
  
  async send(req) {
      const body = {
        user_id: req.auth_user._id,
        group_id: req.body.groupId,
        message: req.body.message
      };
      const message = await Message.create(body);
      return {
        status: "success",
        message: "Message sent successfully",
        data: message
      };
  }

  async like(req) {
      const message = await Message.findById(req.params.id);
      if (!message) {
        return {
          status: "fail",
          message: "Message Not Found",
        };
      }
      const likedBy = message.liked_by;
      if (likedBy.includes(req.auth_user._id)) {
        return {
          status: "fail",
          message: "Message already liked by you",
        };
      }
      likedBy.push(req.auth_user._id);
      message.liked_by = likedBy;
      await message.save();
      return {
        status: "success",
        message: "Message liked successfully",
        data: message
      };
  }
}
