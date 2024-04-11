import { Router } from 'express';
import { create, destory } from '../controllers/GroupMemberCtrl';
import validate from '../middlewares/validation/CheckValidationError';
import rules from '../middlewares/validation/GroupMemberValidator';
import authGuard from '../middlewares/AuthGuard';
import roleGuard from '../middlewares/RoleGuard';

const router = Router();

router.post('/group-member/add', authGuard, roleGuard.userRoleGuard, rules.validationRules(), validate, create);
router.delete('/group-member/delete/:id', authGuard, roleGuard.userRoleGuard, destory);

module.exports = router;
