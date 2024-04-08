import { User } from "../interfaces/user.interface"
import userModel from "../models/user.model"
import { generateJWT } from "../utils/jwt"

const signupService = async (user: User) => {

  const isExist = await userModel.findOne({email: user.email})

  if(isExist) throw new Error("USER_ALREADY_EXISTS")

  const response = await userModel.create(user)

  return response

}

const loginService = async (req: User) => {

  const user = await userModel.findOne({email: req.email})

  if(!user) throw new Error("USER_NOT_FOUND")
  
  const isPasswordcorrect = await user.comparePassword(req.password)
  
  if(!isPasswordcorrect) throw new Error("INCORRECT_PASSWORD")
  
  const jwt = generateJWT(user)

  return jwt
}

export { signupService, loginService }