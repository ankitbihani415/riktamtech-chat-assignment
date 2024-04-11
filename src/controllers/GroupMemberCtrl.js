import GroupMemberService from '../services/GroupMemberService';

const service = new GroupMemberService();

export async function destory(req, res) {
  try {
    const result = await service.destory(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function create(req, res) {
  try {
    const result = await service.create(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}
