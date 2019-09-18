import express from 'express'

import ValidatorHandling from '../middlewares/ValidatorHandling'

import AccountFormulaController from '../controllers/account-formula/AccountFormulaController'
import AccountFormulaValidator from '../controllers/account-formula/AccountFormulaValidator'

const router = express.Router()

router.get('/', AccountFormulaController.list)
// router.post('/', ValidatorHandling(AccountsValidator.postCreateAccount), AccountsController.save)
// router.get('/:id', AccountsController.detail)
// router.put('/:id', ValidatorHandling(AccountsValidator.putUpdateAccount), AccountsController.update)
// router.delete('/:id', AccountsController.delete)

export default router