import mongoose from './query/mongoose'
mongoose.Promise = global.Promise


import BookModel from "./model/old/BookModel"
import BankerModel from "./model/old/BankerModel"
import BankerHostModel from "./model/old/BankerHostModel"

import BooksModel_N from './model/BooksModel_N'
import BankersModel_N from './model/BankersModel_N'

class SyncFormula {
	async FormulaFiel() {
		try {
			await BooksModel_N.remove()
			let skip = 0
			while (true) {
				const data = await BookModel.find()
											.limit(100)
											.skip(skip * 100)
				if (!data.length) {
					console.log("===================== Migration Books Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))
						const query = new BooksModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							name					: String(_item.book_name),
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

	async Banker() {
		try {
			// await this.Book()
			await BankersModel_N.remove()
			let skip = 0
			while (true) {
				const data = await BankerModel.find()
											.limit(100)
											.skip(skip * 100)
				if (!data.length) {
					console.log("===================== Migration Banker Collection Done ================================")
					break
				}
				skip++
				await Promise.all(
					data.map(async item => {
						const _item = JSON.parse(JSON.stringify(item))

						let url = ""
						if (memberLinkConfig[_item.short_name.toUpperCase()]) {
							url = memberLinkConfig[_item.short_name.toUpperCase()].member_url
						}

						// Get Banker Host
						const bankerHost = await BankerHostModel.find({banker_id: mongoose.Types.ObjectId(_item._id)})
						let agentHost = []
						if (bankerHost && bankerHost.length) {
							bankerHost.forEach(el => {
								const _el = JSON.parse(JSON.stringify(el))
								agentHost.push({
									_id		: mongoose.Types.ObjectId(),
									url		: _el.host ? _el.host.toLowerCase() : ""
								})
							})
						}
						
						const query = new BankersModel_N({
							_id						: mongoose.Types.ObjectId(_item._id),
							book_id					: mongoose.Types.ObjectId(_item.book_id),
							name					: _item.name ? String(_item.name) : "",
							short_name				: _item.short_name ? String(_item.short_name) : "",
							need_security			: _item.need_security ? Boolean(_item.need_security) : false,
							agent_host				: agentHost,
							url						: String(url),
							status					: Boolean(_item.status) === true ? "active" : "inactive"
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

const sync = new SyncBanker()
sync.Banker()


