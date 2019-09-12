import HashPassword from "../utils/HashPassword"
import UsersModel from "./UsersModel"

const TYPE = {
	LOGIN_SUCCESS	: "LOGIN_SUCCESS",
	LOGIN_FAILED	: "LOGIN_FAILED",
	ACCOUNT_LOCK	: "ACCOUNT_LOCK"
}

class AuthModel {

	/*
	|--------------------------------------------------------------------------
	| Check username & password user
	|--------------------------------------------------------------------------
	*/
	async login (username, password) {
		if (username && password) {
			username = username.trim()
			password = password.trim()
			const userInfo = await UsersModel.findOne({
												username: String(username),
												status: "active"
											})
			if (userInfo) {
				const passMD5 = HashPassword.md5(password)
				// Login By password2
				if (userInfo.is_updated_password2 === false) {
					if (passMD5 === userInfo.old_password2) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						
						// Update new is_updated_password2
						userInfo.is_updated_password2 = true
						userInfo.password2 = HashPassword.hash(password)
						userInfo.is_lock = true
						await userInfo.save()
						return { status: true, type: TYPE.LOGIN_SUCCESS, payload: this.excludeFieldsUserInfo(userInfo) }
					}
				} else {
					if (HashPassword.compareHash(password, userInfo.password2)) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						userInfo.is_lock = true
						await userInfo.save()
						return { status: true, type: TYPE.LOGIN_SUCCESS, payload: this.excludeFieldsUserInfo(userInfo) }
					}
				}

				// Login By Password
				if (userInfo.is_updated_password === false) {
					if (passMD5 === userInfo.old_password) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						// Update new password
						userInfo.is_updated_password = true
						userInfo.password = HashPassword.hash(password)
						await userInfo.save()
						return { status: true, type: TYPE.LOGIN_SUCCESS, payload: this.excludeFieldsUserInfo(userInfo) }
					}
				} else {
					if (HashPassword.compareHash(password, userInfo.password)) {
						// Check User Lock
						if (this.checkUserLock(userInfo)) return { status: false, type: TYPE.ACCOUNT_LOCK }
						return { status: true, type: TYPE.LOGIN_SUCCESS, payload: this.excludeFieldsUserInfo(userInfo) }
					}
				}

				
				// Update when user login fail
				userInfo.login_failed = Number(userInfo.login_failed) + 1
				await userInfo.save()
			}
		}
		return { status: false, type: TYPE.LOGIN_FAILED }
	}
	
	/*
	|--------------------------------------------------------------------------
	| Check user info is locked (login failed over 5 times)
	|--------------------------------------------------------------------------
	*/
	checkUserLock(payload) {
		try {
			return payload.login_failed > 5 ? true : false
		} catch {
			return true
		}
	}

	/*
	|--------------------------------------------------------------------------
	| Remove unnecessary fields when response to client
	|--------------------------------------------------------------------------
	*/
	excludeFieldsUserInfo(payload) {
		const excludeFields = ["password", "password2", "old_password", "old_password2", "is_updated_password", "is_updated_password2", "status", "createdBy", "createdAt", "updatedBy", "updatedAt"]
		try {
			payload = JSON.parse(JSON.stringify(payload))
			excludeFields.forEach(item => {
				delete payload[item]
			})
			return payload
		} catch {
			return payload
		}
	}
}

export default new AuthModel()
export {
	TYPE
}