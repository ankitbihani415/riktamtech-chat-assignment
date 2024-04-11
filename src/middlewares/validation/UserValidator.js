import { check } from 'express-validator';
import User from '../../models/user';

const createValidationRules = () => {
	return [
		check('phone').exists().withMessage('Phone Field is required')
			.bail()
			.isInt().withMessage('Phone Field should be numeric')
			.bail()
			.isLength({ min: 10, max: 10 }).withMessage('Phone should be of 10 digits')
			.custom(async value => {
				const user = await User.findOne({ 'phone': value });
				if (user) {
					return Promise.reject('Phone Number already in use');
				}
			}),
		check('password').exists().withMessage('Password Field is required')
			.bail()
			.isLength({ min: 8 }).withMessage('Password length should be greater then 8'),
	];
}

const updateValidationRules = () => {
	return [
		check('phone')
			.isInt().withMessage('Phone Field should be numeric')
			.bail()
			.isLength({ min: 10, max: 10 }).withMessage('Phone should be of 10 digits')
			.custom(async value => {
				const user = await User.findOne({ 'phone': value });
				if (user) {
					return Promise.reject('Phone Number already in use');
				}
			}),
		check('password')
			.isLength({ min: 8 }).withMessage('Password length should be greater then 8'),
	];
}

export default {
	createValidationRules,
	updateValidationRules,
}