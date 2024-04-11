import { Router } from 'express';
import { send, like } from '../controllers/MessageCtrl';
import validate from '../middlewares/validation/CheckValidationError';
import rules from '../middlewares/validation/MessageValidator';
import authGuard from '../middlewares/AuthGuard';
import roleGuard from '../middlewares/RoleGuard';

const router = Router();

router.post('/message/send', authGuard, roleGuard.userRoleGuard, rules.validationRules(), validate, send);
router.post('/message/like/:id', authGuard, roleGuard.userRoleGuard, like);

module.exports = router;
