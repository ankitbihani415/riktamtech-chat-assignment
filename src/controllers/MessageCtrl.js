import MessageService from '../services/MessageService';

const service = new MessageService();

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

export async function send(req, res) {
  try {
    const result = await service.send(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function like(req, res) {
  try {
    const result = await service.like(req);
    const status = result.status === "fail" ? 400 : 201;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}
