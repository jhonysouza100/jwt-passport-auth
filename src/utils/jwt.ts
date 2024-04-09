import { User } from "../interfaces/user.interface"
import config from "../config"
import jwt from "jsonwebtoken"

const generateJWT = (user: User) => {

  const JWT_SECRET = config.jwtSecret
  
  return jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {
    expiresIn: 86400
  })

}

export { generateJWT }