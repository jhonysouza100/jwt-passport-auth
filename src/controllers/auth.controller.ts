import { Request, Response } from "express"

const signupController = async (req: Request, res: Response) => {
  try {
    
    res.send("Hello signup!")

  } catch (error) {
    
  }
}

const loginController = async (req: Request, res: Response) => {
  try {
    
    res.send("hello login!")

  } catch (error) {
    
  }
}

export { signupController, loginController }