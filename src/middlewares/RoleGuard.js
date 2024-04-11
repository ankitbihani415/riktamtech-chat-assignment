function adminRoleGuard(req, res, next) {
  if (req.auth_user.type === 'admin') {
    next();
  } else {
    return res.status(403).send({ message: 'You are not allowed to use this resource' });
  }
}

function userRoleGuard(req, res, next) {
  if (req.auth_user.type === 'user') {
    next();
  } else {
    return res.status(403).send({ message: 'You are not allowed to use this resource' });
  }
}

export default {
  adminRoleGuard,
  userRoleGuard,
}
