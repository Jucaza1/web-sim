import express, { Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser"
import { UserService } from './services/user-service';
import { UserController } from './controllers/user-controller';
import { CompanyService } from './services/company-service';
import { CompanyController } from './controllers/company-controller';
import { createRouter } from './routes/routes-dev-filter';
import { AuthController } from './controllers/auth-controller';
import { AuthServiceJWT } from './services/auth-service';
import { HasherBcrypt } from './services/hashing';
import { UserCreate } from './types/db';
import { fileServer } from './routes/file-server';
import { UserStoreFactory } from './models/user';
import { CompanyStoreFactory } from './models/company';
import { SimulatorService } from './services/simulator-service';
import { SimulatorController } from './controllers/simulator-controller';
import { SimulatorStoreFactory } from './models/simulator';
import { SimulatorWebglStoreFactory } from './models/simulator-webgl';
import { SimulatorWebglService } from './services/simulator-webgl-service';
import { SimulatorWebglController } from './controllers/simulator-webgl-controller';
import { globalErrorHandler } from './controllers/error-controller';
import { swaggerRouter } from './routes/swagger';
import { seedSimulators } from './scripts/seed-simulators';

const app = express();
const corsOptions: cors.CorsOptions = {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    // origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
}

app.disable('x-powered-by')
app.use(cookieParser())

const jsonParser = express.json({ limit: "4kb" })
app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
        jsonParser(req, res, next)
    } else {
        next()
    }
})
app.use(cors(corsOptions))
app.get('/health', (_, res: Response) => {
    res.status(200).json({ message: 'Server is OK' })
})

const JWT_SECRET = process.env.JWT_SECRET ?? "supersecret"
const DB_KIND = process.env.DB_KIND ?? "memory" // or "postgreslq"
const DB_SEED = process.env.DB_SEED === "true"

const userStore = UserStoreFactory(DB_KIND, DB_SEED)
const companyStore = CompanyStoreFactory(DB_KIND, DB_SEED)
const simulatorStore = SimulatorStoreFactory(DB_KIND, DB_SEED)
const simulatorWebglStore = SimulatorWebglStoreFactory(DB_KIND, DB_SEED)
const pwdHasher = new HasherBcrypt(10)

const userService = new UserService(userStore, pwdHasher)
const userController = new UserController(userService)

const companyService = new CompanyService(companyStore)
const companyController = new CompanyController(companyService)

export const simulatorService = new SimulatorService(simulatorStore)
const simulatorController = new SimulatorController(simulatorService)

export const simulatorWebglService = new SimulatorWebglService(simulatorWebglStore)
const simulatorWebglController = new SimulatorWebglController(simulatorWebglService)

const authService = new AuthServiceJWT(JWT_SECRET, userService, pwdHasher)
const authController = new AuthController(authService)
const router = createRouter(
    userController,
    companyController,
    simulatorController,
    simulatorWebglController,
    authController
)

app.use("/api/v1/docs", swaggerRouter())
app.use("/api/v1", router)
app.use(fileServer(authController))

// error handler
app.use(globalErrorHandler)

// inyect addmin user
// read email and password from env
const adminUser: UserCreate = {
    email: process.env.USER_ADMIN_EMAIL ?? "admin@admin.com",
    password: process.env.USER_ADMIN_PASSWORD ?? "adminadmin",
    name: "admin",
    // companyId: "e30e81bc-4f4f-4339-a40c-feaabca0efb1",
    profession: "admin",
    // isActive: true,
}
const pwd = adminUser.password
userService.createUser(adminUser, "ADMIN").then((res) => {
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
if (DB_SEED) {
    console.log("seeding simulators")
    seedSimulators()
}

export default app
