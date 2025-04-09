import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserMemoryStore } from './models/user_memory';
import { UserService } from './services/user_service';
import { UserController } from './controllers/user_controller';
import { CompanyMemoryStore } from './models/company_memory';
import { CompanyService } from './services/company_service';
import { CompanyController } from './controllers/company_controller';
import { createRouter } from './routes/routes_dev';

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
const globalErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err)
    res.status(500).json({ error: err.message })
}
app.use(globalErrorHandler)

export default app
