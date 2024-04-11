import { check } from 'express-validator';

const validationRules = () => {
  	return [
			check('name').exists().withMessage('Name is required')
        .isAlpha().withMessage('Name Field should contains alphabatic characters'),
		];
}

export default {
	validationRules,
}
