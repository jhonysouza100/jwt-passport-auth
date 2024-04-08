import { Request, Response } from "express"
import { loginService, signupService } from "../services/auth.service"
import { errorHandler } from "../utils/error"
import { User } from "../interfaces/user.interface"

const signupController = async (req: Request, res: Response) => {
  try {

    if(!req.body.email || !req.body.password) {
      res.status(400)
      throw new Error("EMAIL_AND_PASSWORD_IS_REQUIRED")
    }
    
    const newUser: User = await signupService(req.body)
    
    res.status(201).json(newUser)

  } catch (error) {
    // res.status(400).json({error: (error as Error).message})
    errorHandler(res, error as Error)
  }
}

const loginController = async (req: Request, res: Response) => {
  try {
    
    if(!req.body.email || !req.body.password) {
      res.status(400)
      throw new Error("EMAIL_AND_PASSWORD_IS_REQUIRED")
    }
    
    const token = await loginService(req.body)

    res.json({
      token
    })

  } catch (error) {
    errorHandler(res, error as Error)
  }
}

export { signupController, loginController }