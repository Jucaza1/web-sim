import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserMemoryStore } from './models/user-memory';
import { UserService } from './services/user-service';
import { UserController } from './controllers/user-controller';
import { CompanyMemoryStore } from './models/company-memory';
import { CompanyService } from './services/company-service';
import { CompanyController } from './controllers/company-controller';
import { createRouter } from './routes/routes-dev';
import { HttpError } from './types/result';

const app = express();
const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(express.json())
app.use(cors(corsOptions))
app.get('/health', (_, res) => {
    res.status(200).json({ message: 'Server is OK' })
})
const userController = new UserController(new UserService(new UserMemoryStore()))
const companyController = new CompanyController(new CompanyService(new CompanyMemoryStore()))
const router = createRouter(userController, companyController)

app.use('/api/v1', router)

// error handler
const globalErrorHandler: ErrorRequestHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(err.status).json({ error: err.msg })
}
app.use(globalErrorHandler)

export default app
