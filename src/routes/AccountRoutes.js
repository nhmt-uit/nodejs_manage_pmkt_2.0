import express from 'express'

import ValidatorHandling from '../middlewares/ValidatorHandling'

import AccountsController from '../controllers/accounts/AccountsController';
// import AccountsValidator from '../controllers/accounts/AccountsValidator'

const router = express.Router();

router.get('/', AccountsController.index);
// router.get('/', ValidatorHandling(AccountsValidator.postCreateUser), AccountsController.index);
router.post('/', AccountsController.save);
// router.post('/', ValidatorHandling(AccountsValidator.postCreateUser), AccountsController.save);
// router.put('/', ValidatorHandling(AccountsValidator.postCreateUser), AccountsController.save);
// router.delete('/:id', UsersController.delete);

export default router