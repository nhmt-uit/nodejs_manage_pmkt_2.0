import bcrypt from "bcrypt"

class HashPassword {
    constructor() {}

    genSalt() {
        const saltOrRounds = Math.round(Math.random() * 10)
        return bcrypt.genSaltSync(saltOrRounds)
    }

    hash(password) {
        return bcrypt.hashSync(password, this.genSalt())
    }

    compareHash(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

export default new HashPassword()