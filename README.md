# Json Web Token + Passport + Morgan

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

> Create MVC Structure

`/src`

```bash
mkdir router controllers services utils middlewares models interfaces config connection
```

## Initialize project

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

`./src/config/passport.ts`

```javascript
import passport from 'passport'

const pass = new Passport()

export { pass }

```