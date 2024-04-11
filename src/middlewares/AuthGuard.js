import User from '../models/user';
import { verify as _verify } from 'jsonwebtoken';

function verifyToken(token) {
  var verify = false;
  _verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (!err) {
      verify = decoded.id;
    }
  });
  return verify;
}

export default async function authGuard(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }
  const vt = verifyToken(token);
  if (!vt) {
    return res.status(400).send({ auth: false, message: 'Failed to authenticate token.' })
  }
  else {
    const user = await User.findById(vt);
    req.auth_user = user
    next()
  }
}
