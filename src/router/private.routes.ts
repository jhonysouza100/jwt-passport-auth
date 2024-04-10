import { Router, Request, Response } from "express";
import passport from "passport"

const router = Router()

router.get('/private', passport.authenticate('jwt', { session: false}), (req: Request, res: Response) => {
  try {
    res.send('AUTHORIZED_USER')
  } catch (error) {
    res.send('NO_ATHORIZED_USER')
  }
})

export { router }