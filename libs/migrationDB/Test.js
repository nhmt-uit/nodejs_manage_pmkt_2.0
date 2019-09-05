import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import FormulaGroupsModel_N from './model/FormulaGroupsModel_N'
import FormulasModel_N from './model/FormulasModel_N'

class Test {
	async Banker() {
		try {
			// console.log("fuck")
			const result = await FormulaGroupsModel_N.findOne({
				_id: mongoose.Types.ObjectId("5ca34174b5e0b8e9e7f6c846")
			})
			.populate({
				path: "formulas",
				model: "formulas"
			})

			console.log(result)
		} catch (error) {
			console.error(error)
		}
	}
}

const sync = new Test()
// sync.Account()
sync.Banker()


