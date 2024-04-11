import GroupService from '../services/GroupService';

const service = new GroupService();

export async function list(req, res) {
  try {
    const result = await service.list(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function show(req, res) {
  try {
    const result = await service.show(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

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

export async function update(req, res) {
  try {
    const result = await service.update(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}
