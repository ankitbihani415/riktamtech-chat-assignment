import { check } from 'express-validator';

const loginValidationRules = () => {
  	return [
			check('phone').exists().withMessage('Phone Field is required')
						.bail()
						.isInt().withMessage('Phone Field should be numeric')
						.bail()
						.isLength({min:10,max:10}).withMessage('Phone should be of 10 digits'),
						
			check('password').exists().withMessage('Password Field is required')
						.bail()
						.isLength({min:8}).withMessage('Password length should be greater then 8'),
		];
}

const verifyPhoneValidationRules = () => {
	return [
			check('phone').exists().withMessage('Phone Field is required')
						.isInt().withMessage('Phone Field should be numeric')
						.isLength({min:10,max:10}).withMessage('Phone should be of 10 digits'),
						
			check('phoneVerificationCode')
					.exists().withMessage('Phone Verification Code Field is required')
					.isLength({min:6,max:6}).withMessage('Phone Verification Code length should be greater then 8'),
		];	
}

const verifyEmailValidationRules = () => {
	return [
			check('email').exists().withMessage('Email Field is required')
						.isAlphanumeric().withMessage('Email Field should be alpha numeric'),
						
			check('emailVerificationCode')
					.exists().withMessage('Email Verification Code Field is required')
					.isLength({min:6,max:6}).withMessage('Email Verification Code length should be greater then 8'),
		];	
}
export default {
	loginValidationRules,
	verifyPhoneValidationRules,
	verifyEmailValidationRules,
}
