import AuthenticationService from '../services/AuthService';

const service = new AuthenticationService();

export async function login(req, res) {
  try {
    const result = await service.login(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function verifyPhone(req, res) {
  try {
    const result = await service.verifyPhone(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function resendPhoneVerificationCode(req, res) {
  try {
    const result = await service.resendPhoneVerificationCode(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    const result = await service.verifyEmail(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}

export async function resendEmailVerificationCode(req, res) {
  try {
    const result = await service.resendEmailVerificationCode(req);
    const status = result.status === "fail" ? 400 : 200;
    res.status(status).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
}
