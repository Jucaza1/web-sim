import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { UserMemoryStore } from './models/user-memory';
import { UserService } from './services/user-service';
import { UserController } from './controllers/user-controller';
import { CompanyMemoryStore } from './models/company-memory';
import { CompanyService } from './services/company-service';
import { CompanyController } from './controllers/company-controller';
import { createRouter } from './routes/routes-dev';
import { HttpError } from './types/result';
import { AuthController } from './controllers/auth-controller';
import { AuthServiceJWT } from './services/auth-service';
import { HasherBcrypt } from './services/hashing';

const app = express();
const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: '*',
    optionsSuccessStatus: 200,
}

app.disable('x-powered-by')
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))
app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is OK' })
})

const pwdHasher = new HasherBcrypt(10)
const userService = new UserService(new UserMemoryStore(), pwdHasher)
const userController = new UserController(userService)
const companyController = new CompanyController(new CompanyService(new CompanyMemoryStore()))
const authService = new AuthServiceJWT("supersecret", userService, pwdHasher)
const authController = new AuthController(authService)
const router = createRouter(userController, companyController, authController)

app.use('/api/v1', router)

// error handler
const globalErrorHandler: ErrorRequestHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(err.status ?? 500).json({ error: err.msg })
}
app.use(globalErrorHandler)

export default app
