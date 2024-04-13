import { check } from 'express-validator';

const validationRules = () => {
  	return [
      check('message').exists().withMessage('message is required')
        .isString().withMessage('message Field should contains alphabatic & numeric characters'),
			check('groupId').exists().withMessage('groupId is required'),
		];
}

export default {
	validationRules,
}
