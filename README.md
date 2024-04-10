# JSON Web Token + Passport + Bcrypt

En este ejemplo practico de Javascript/Typescript, se crea una REST API usando Nodejs, Mongodb (a traves de Mongoose) adicionalmente de modulos como bcrypt para el cifrado de datos sencibles y passport para validadación del token.


## Initialize

```javascript	
npm init
```

/`package.json`

> Install

```bash
npm i experss mongoose jsonwebtoken bcrypt cors dotenv morgan passport passport-jwt
```

> Install Dev dependencies

```bash
npm i -D nodemon @types/experss @types/mongoose @types/jsonwebtoken @types/bcrypt @types/cors @types/dotenv @types/morgan @types/passport @types/passport-jwt
```

## Initialize Typescript

```bash
tsc --init
```

/`tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,                    
    "skipLibCheck": true                     
  }
}

```

## Project Setup

> Create MVC Structure

`/src`

```bash
mkdir router controllers services utils middlewares models interfaces config connection
```

`./src/app.ts`

```javascript
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './router'

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

// routes
app.use(router)

export default app
```

`./src/index.ts`

```javascript	
import app from './app'
import { connection } from './connection'

// database connection
connection().then(() => console.log("DataBase conexion ready"))

// server listening
app.listen(app.get('port'), () => console.log(`Server listen on port:${app.get('port')}`))
```

## Configure Passport Settings

> Initialize in App.ts

`./src/app.ts`

```javascript
import passport from "passport"
import passportMiddleware from "./middlewares/passport.middleware"

// api middlewares
app.use(passport.initialize())
passport.use(passportMiddleware)

```
> Create a middleware function

`./src/middleares/passport.middleware.ts`

```javascript
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config"
import userModel from "../models/user.model";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

export default new Strategy(options, async (payload, done) => {
  
  try {

    const user = await userModel.findById(payload.id)
  
    if(user) return done(null, user)
  
    return done(null, false)

  } catch (error) {
    console.log(error)
  }

})
```
> Use the middleware in routes

`./src/router/private.routes.ts`

```javascript
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
```

## Register and Login Example

> `Register` new user

```php
POST http://localhost:3000/api/auth/signup
```

Body JSON:

```json
{
  "email": "jhony@gmail.com",
  "password": "123"
}
```

> `Login` user

```php
POST http://localhost:3000/api/auth/login
```

Body JSON:

```json
{
  "email": "jhony@gmail.com",
  "password": "123"
}
```

#### *Response:*

```json
{
  "token": "!#$%&123qwerty"
}
```

## Private Route Parameters

```php
GET http://localhost:3000/api/private/private
```

HTTP Hearders: 

```json
  {
    "Authorization": "Bearer !#$%&123qwerty"
  }
```