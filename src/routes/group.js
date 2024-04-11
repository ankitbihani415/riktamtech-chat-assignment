import { Router } from 'express';
import { list, show, update, create, destory } from '../controllers/GroupCtrl';
import validate from '../middlewares/validation/CheckValidationError';
import rules from '../middlewares/validation/GroupValidator';
import authGuard from '../middlewares/AuthGuard';
import roleGuard from '../middlewares/RoleGuard';

const router = Router();

router.get('/group/list', authGuard, roleGuard.userRoleGuard, list);
router.get('/group/show/:id', authGuard, roleGuard.userRoleGuard, show);
router.post('/group/create', authGuard, roleGuard.userRoleGuard, rules.validationRules(), validate, create);
router.put('/group/update/:id', authGuard, roleGuard.userRoleGuard, rules.validationRules(), validate, update);
router.delete('/group/delete/:id', authGuard, roleGuard.userRoleGuard, destory);

module.exports = router;
