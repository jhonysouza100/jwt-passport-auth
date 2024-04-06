const JWT_SECRET = process.env.JWT_SECRET
const DB_URI = process.env.DB_URI
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

export default {
  jwtSecret: JWT_SECRET,
  DB: {
    URI: DB_URI,
    USER: DB_USER,
    PASS: DB_PASS
  }
}