const JWT_SECRET = process.env.JWT_SECRET
const BCRYPT_SALT = process.env.BCRYPT_SALT
const DB_URI = process.env.DB_URI
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

export default {
  jwtSecret: JWT_SECRET,
  bcryptSalt: BCRYPT_SALT,
  DB: {
    URI: DB_URI,
    USER: DB_USER,
    PASS: DB_PASS
  }
}