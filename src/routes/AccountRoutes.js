import express from 'express'

import ValidatorHandling from '../middlewares/ValidatorHandling'

import AccountsController from '../controllers/accounts/AccountsController';
import AccountsValidator from '../controllers/accounts/AccountsValidator'

const router = express.Router();

router.get('/', AccountsController.index);
router.post('/', ValidatorHandling(AccountsValidator.postCreateAccount), AccountsController.save);
router.get('/:id', AccountsController.get);
router.put('/:id', AccountsController.update);
router.delete('/:id', AccountsController.delete);

export default router