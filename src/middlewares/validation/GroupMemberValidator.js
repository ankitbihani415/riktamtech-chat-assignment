import { check } from 'express-validator';

const validationRules = () => {
  	return [
			check('groupId').exists().withMessage('groupId is required'),
			check('userId').exists().withMessage('userId is required'),
		];
}

export default {
	validationRules,
}
