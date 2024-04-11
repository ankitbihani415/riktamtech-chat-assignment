import { Router } from 'express';
import { login, verifyPhone, resendPhoneVerificationCode, verifyEmail, resendEmailVerificationCode } from '../controllers/AuthCtrl';
import validate from '../middlewares/validation/CheckValidationError';
import rules from '../middlewares/validation/AuthValidator';

const router = Router();

router.post('/login', rules.loginValidationRules(), validate, login);
router.post('/verify-phone', rules.verifyPhoneValidationRules(), validate, verifyPhone);
router.get('/resend-verification-code/:phone', resendPhoneVerificationCode);
router.post('/verify-email', rules.verifyEmailValidationRules(), validate, verifyEmail);
router.get('/resend-verification-code/:email', resendEmailVerificationCode);

module.exports = router;
