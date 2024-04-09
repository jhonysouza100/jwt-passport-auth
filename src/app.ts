import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './router'

import passport from 'passport'
import passportMiddleware from './middlewares/passport.middleware'

// initializations
const app = express()

const PORT = process.env.PORT || 3000

// settings
app.set('port', PORT)

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())
passport.use(passportMiddleware)


// routes
app.get('/', (req: Request, res: Response) => { res.send("Hola mundo")})
app.use(router)

export default app