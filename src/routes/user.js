import { Router } from 'express';
import { create, update, list } from '../controllers/UserCtrl';
import validate from '../middlewares/validation/CheckValidationError';
import rules from '../middlewares/validation/UserValidator';
import authGuard from '../middlewares/AuthGuard';
import roleGuard from '../middlewares/RoleGuard';

const router = Router();

router.get('/user/list', authGuard, list);
router.post('/user/create', authGuard, roleGuard.adminRoleGuard, rules.createValidationRules(), validate, create);
router.put('/user/update/:id', authGuard, roleGuard.adminRoleGuard, rules.updateValidationRules(), validate, update);

module.exports = router;
