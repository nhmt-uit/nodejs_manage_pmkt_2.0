import mongoose from './mongoose'
mongoose.Promise = global.Promise


import UsersModel from "../model/old/UsersModel"
import UsersModel_N from '../model/UsersModel_N'


class Sync {
	async Users() {
		try {
			await UsersModel_N.remove({})
			let skip = 0
			let i = 0
			while (true) {
				const data = await UsersModel.find()
											.limit(100)
											.skip(skip * 100)
				if (!data.length) {
					console.log("=============== Done =================")
					break
				}
				skip++
				const request = data.map(item => {
					const _item = JSON.parse(JSON.stringify(item))
					const userQuery = new UsersModel_N({
						_id						: mongoose.Types.ObjectId(_item._id),
						parent_id				: mongoose.Types.ObjectId(_item.parent_id),
						username				: String(_item.username),
						role					: _item.roles ? Number(_item.roles) : null,
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
					return userQuery.save()
				})
				const res = await Promise.all(request)
				console.log(res)
			}
		} catch (error) {
			console.error(error)
		}
	}

}

export default new Sync()


