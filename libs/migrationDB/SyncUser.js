import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import UsersModel from "./model/old/UsersModel"

import UsersModel_N from './model/UsersModel_N'
import ExcludeBankersModel_N from "./model/ExcludeBankersModel_N"
import IncludeBankersModel_N from "./model/IncludeBankersModel_N"


class SyncUser {
	async Users() {
		try {
			await UsersModel_N.remove({})
			await ExcludeBankersModel_N.remove({})
			await IncludeBankersModel_N.remove({})
			let skip = 0
			while (true) {
				const data = await UsersModel.find()
											.limit(100)
											.skip(skip * 100)
				if (!data.length) {
					console.log("===================== Migration Users Collection Done ================================")
					break
				}
				skip++
				data.map(async item => {
					const _item = JSON.parse(JSON.stringify(item))
					const query = new UsersModel_N({
						_id						: mongoose.Types.ObjectId(_item._id),
						parent_id				: mongoose.Types.ObjectId(_item.parent_id),
						username				: String(_item.username),
						role					: _item.roles ? Number(_item.roles) : 0,
						secure_code				: _item.us_secure_code ? Number(_item.us_secure_code) : null,
						login_failed			: _item.us_login_failed ? Number(_item.us_login_failed) : 0,
						lang_code				: _item.lang ? String(_item.lang) : "vi",
						allow_export			: _item.special_feature ? Boolean(_item.special_feature) : false,
						allow_report_detail		: _item.report_detail_feature ? Boolean(_item.report_detail_feature) : false,
						enable_start			: _item.ep_start && _item.ep_start !== 1555200 ? new Date(Number(_item.ep_start) *1000) : null,
						enable_end				: _item.ep_end && _item.ep_end !== 1555200 ? new Date(Number(_item.ep_end) *1000) : null,
						old_password			: String(_item.password) || null,
						is_updated_password		: false,
						old_pasword2			: _item.password2 ? String(_item.password2) : null,
						is_updated_password2	: false,
					})
					const result = await query.save()

					// Insert exclude_banker collection
					if(_item.exclude_banker && _item.exclude_banker.length) {
						const mixedExcludeBanker = _item.exclude_banker.map(item => {
							item = mongoose.Types.ObjectId(item)
							return item
						})
						const excludeBanker = new ExcludeBankersModel_N({
							user_id			: mongoose.Types.ObjectId(_item._id),
							banker_ids		: mixedExcludeBanker
						})
						await excludeBanker.save()

					}

					// const includeBanker = new IncludeBankersModel_N({
					// 	user_id			: mongoose.Types.ObjectId(_item._id),
					// 	banker_ids		: _item.exclude_banker,
					// })
					// await includeBanker.save()
					

					console.log(result)

				})
			}
		} catch (error) {
			console.error(error)
		}
	}

}

const sync = new SyncUser()
sync.Users()

