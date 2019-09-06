import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import ReportCycleModel from "./model/old/ReportCycleModel"
import ReportDetailModel from "./model/old/ReportDetailModel"
import ReportHandleModel from "./model/old/ReportHandleModel"

import ReportsModel_N from './model/ReportsModel_N'
import ReportHandlesModel_N from './model/ReportHandlesModel_N'
import ReportDetailsModel_N from './model/ReportDetailsModel_N'

class SyncReport {
	async Truncate() {
		return Promise.all([
			ReportsModel_N.remove(),
			ReportHandlesModel_N.remove(),
			ReportDetailsModel_N.remove()
		])
	}

	async Report(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await ReportCycleModel.find({
														deleted: { $eq: 0 }
													})
													.limit(limit)
													.skip(skip * limit)
													.sort({ createdAt: 1 })
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Reports Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new ReportsModel_N({
							_id				: mongoose.Types.ObjectId(_item._id),
							user_id			: mongoose.Types.ObjectId(_item.uid),
							name			: _item.chuky ? String(_item.chuky) : "",
							is_exported		: _item.is_exported ? Boolean(_item.is_exported) : false,
							status			: Number(_item.deleted) !== 0 ? "delete" : "active"
						})
						const result = await query.save()
						console.log(result)
					})
				)
			}
		} catch (error) {
			console.error(error)
		}
	}

	async ReportHandle(_limit, _skip, _maxSkip) {
		try {
			let limit = Number(_limit) || 100
			let skip = Number(_skip) || 0
			while (true) {
				const data = await ReportHandleModel.find({
														deleted: { $eq: 0 }
													})
													.limit(limit)
													.skip(skip * limit)
													.sort({ createdAt: 1 })
				if (!data.length || (_maxSkip && skip > _maxSkip)) {
					console.log("===================== Migration Reports Handle Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new ReportHandlesModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							report_id				: mongoose.Types.ObjectId,
							user_id					: mongoose.Types.ObjectId,
							t_currentcy_id			: mongoose.Types.ObjectId(_item.dv_tien_te_id),
							ref_transaction_id		: _item.ref_transaction_id ? mongoose.Types.ObjectId(_item.ref_transaction_id) : null,
							type					: _item.type_report ? Number(_item.type_report).trim() : null,
							origin_amount			: _item.result ? Number(_item.result) : null,
							amount					: _item.result ? Number(_item.result) : null,
							note					: _item.note ? String(_item.note).trim() : "",
							status					: Number(_item.deleted) !== 0 ? "delete" : "active"
						})
						const result = await query.save()
						console.log(result)
					})
				)
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export default new SyncReport()


