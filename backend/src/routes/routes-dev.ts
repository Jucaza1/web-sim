import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { CompanyController } from "../controllers/company-controller";
import { AuthController } from "../controllers/auth-controller";

export function createRouter(
    userController: UserController,
    companyController: CompanyController,
    authController: AuthController
) {
    const router = Router()
    //-> /api/v1
    router.post("/register", userController.createUser)
    router.post("/login", authController.login)

    // User routes unprotected
    router.get("/dev/users/:id", userController.getUser)
    router.get("/dev/users", userController.getUsers)
    router.post("/dev/users", userController.createUser)
    router.put("/dev/users/:id", userController.updateUser)
    router.delete("/dev/users/:id", userController.deleteUser)

    // Company routes unprotected
    router.get("/dev/companies/:id", companyController.getCompany)
    router.get("/dev/companies", companyController.getCompanies)
    router.post("/dev/companies", companyController.createCompany)
    router.put("/dev/companies/:id", companyController.updateCompany)
    router.delete("/dev/companies/:id", companyController.deleteCompany)

    const routerAuth = Router()
    // User routes
    routerAuth.get("/users/:id", userController.getUser)
    routerAuth.get("/users", userController.getUsers)
    // routerAuth.post("/users", userController.createUser)
    routerAuth.put("/users/:id", userController.updateUser)
    routerAuth.delete("/users/:id", userController.deleteUser)

    // Company routes
    routerAuth.get("/companies/:id", companyController.getCompany)
    routerAuth.get("/companies", companyController.getCompanies)
    routerAuth.post("/companies", companyController.createCompany)
    routerAuth.put("/companies/:id", companyController.updateCompany)
    routerAuth.delete("/companies/:id", companyController.deleteCompany)
    router.use("/", authController.authMiddleware, routerAuth)

    return router;
}
