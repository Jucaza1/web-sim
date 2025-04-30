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
import { UserCreate } from './types/db';

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
app.get('/health', (_, res: Response) => {
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
const globalErrorHandler: ErrorRequestHandler = (
    { httpError, exception }: { httpError: HttpError, exception: Error },
    _req: Request,
    res: Response,
    _next: NextFunction
) => {

    console.error(httpError)
    res.status(httpError.status ?? 500).json({ error: httpError.msg })
    if (exception) {
        console.log(exception)
    }
}
app.use(globalErrorHandler)

// inyect addmin user
// read email and password from env
const adminUser: UserCreate = {
    email: process.env.USER_ADMIN_EMAIL ?? "admin@admin.com",
    password: process.env.USER_ADMIN_PASSWORD ?? "adminadmin",
    name: "admin",
    // isAdmin: true,
    // companyId: "e30e81bc-4f4f-4339-a40c-feaabca0efb1",
    profession: "admin",
    // isActive: true,
}
const pwd = adminUser.password
userService.createUser(adminUser).then((res) => {
    if (res.ok) {
        console.log("Admin user created")
        console.log("Admin user email: ", adminUser.email)
        console.log("Admin user password: ", pwd)
    } else {
        console.log("Admin user creation failed")
        console.log(res.err!.msg)
    }

}).catch((e) => {
    console.log("Admin user creation failed: ", e)
})


export default app
