import { Response } from "express"

const errorHandler = (res: Response, error: Error) => {
  return res.json({error: (error).message})
}

export { errorHandler}