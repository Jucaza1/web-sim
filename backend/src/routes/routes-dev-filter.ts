import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { CompanyController } from "../controllers/company-controller";
import { AuthController } from "../controllers/auth-controller";
import { SimulatorController } from "../controllers/simulator-controller";
import { SimulatorWebglController } from "../controllers/simulator-webgl-controller";
import { jsonMiddleware } from "../controllers/json-filter";

export function createRouter(
    userController: UserController,
    companyController: CompanyController,
    simulatorController: SimulatorController,
    simulatorWebglController: SimulatorWebglController,
    authController: AuthController
) {
    const router = Router()
    //-> /api/v1
    router.post("/register", jsonMiddleware, userController.createUser)
    router.post("/login", jsonMiddleware, authController.login)

    // User routes unprotected
    router.get("/dev/users/:id", userController.getUser)
    router.get("/dev/users/email/:email", userController.getUserByEmail)
    router.get("/dev/users", userController.getUsers)
    router.post("/dev/users", jsonMiddleware, userController.createUser)
    router.post("/dev/admin", jsonMiddleware, userController.createAdmin)
    router.post("/dev/admincompany", jsonMiddleware, userController.createAdminCompany)
    router.put("/dev/users/:id", jsonMiddleware, userController.updateUser)
    router.delete("/dev/users/:id", userController.deleteUser)

    // Company routes unprotected
    router.get("/dev/companies/:id", companyController.getCompany)
    router.get("/dev/companies", companyController.getCompanies)
    router.get("/dev/companiesid", companyController.getCompaniesIdName)
    router.post("/dev/companies", jsonMiddleware, companyController.createCompany)
    router.put("/dev/companies/:id", jsonMiddleware, companyController.updateCompany)
    router.delete("/dev/companies/:id", companyController.deleteCompany)

    // Simulator routes unprotected
    router.get("/dev/companies/:id/simulators", simulatorController.getSimulatorsByCompanyId)
    router.get("/dev/simulators/:id", simulatorController.getSimulator)
    router.get("/dev/simulators", simulatorController.getSimulators)
    router.post("/dev/simulators", jsonMiddleware, simulatorController.createSimulator)
    router.put("/dev/simulators/:id", jsonMiddleware, simulatorController.updateSimulator)
    router.delete("/dev/simulators/:id", simulatorController.deleteSimulator)

    // Simulator WebGL routes unprotected

    router.get("/dev/simulator/:id/webgl/", simulatorWebglController.getWebglBySimulatorId)
    router.get("/dev/webgl", simulatorWebglController.getWebgls)
    router.get("/dev/webgl/:id", simulatorWebglController.getWebgl)
    router.post("/dev/webgl", jsonMiddleware, simulatorWebglController.createWebgl)
    router.put("/dev/webgl/:id", jsonMiddleware, simulatorWebglController.updateWebgl)
    router.delete("/dev/webgl/:id", simulatorWebglController.deleteWebgl)

    const routerAuth = Router()
    // User routes
    routerAuth.get("/users/:id", userController.getUser)
    routerAuth.get("/users/email/:email", userController.getUserByEmail)
    routerAuth.get("/users", userController.getUsers)
    routerAuth.post("/users", jsonMiddleware, userController.createUser)
    routerAuth.post("/admin", jsonMiddleware, userController.createAdmin)
    routerAuth.post("/admincompany", jsonMiddleware, userController.createAdminCompany)
    routerAuth.put("/users/:id", jsonMiddleware, userController.updateUser)
    routerAuth.delete("/users/:id", userController.deleteUser)
    routerAuth.get("/companies/:id/users", userController.getUsersByCompanyId)

    // Company routes
    routerAuth.get("/companies/:id", companyController.getCompany)
    routerAuth.get("/companies", companyController.getCompanies)
    routerAuth.get("/companiesid", companyController.getCompaniesIdName)
    routerAuth.post("/companies", jsonMiddleware, companyController.createCompany)
    routerAuth.put("/companies/:id", jsonMiddleware, companyController.updateCompany)
    routerAuth.delete("/companies/:id", companyController.deleteCompany)

    // Simulator routes
    routerAuth.get("/companies/:id/simulators", simulatorController.getSimulatorsByCompanyId)
    routerAuth.get("/simulators/:id", simulatorController.getSimulator)
    routerAuth.get("/simulators", simulatorController.getSimulators)
    routerAuth.post("/simulators", jsonMiddleware, simulatorController.createSimulator)
    routerAuth.put("/simulators/:id", jsonMiddleware, simulatorController.updateSimulator)
    routerAuth.delete("/simulators/:id", simulatorController.deleteSimulator)

    // Simulator WebGL routes
    routerAuth.get("/simulator/:id/webgl/", simulatorWebglController.getWebglBySimulatorId)
    routerAuth.get("/webgl", simulatorWebglController.getWebgls)
    routerAuth.get("/webgl/:id", simulatorWebglController.getWebgl)
    routerAuth.post("/webgl", jsonMiddleware, simulatorWebglController.createWebgl)
    routerAuth.put("/webgl/:id", jsonMiddleware, simulatorWebglController.updateWebgl)
    routerAuth.delete("/webgl/:id", simulatorWebglController.deleteWebgl)


    router.use("/", authController.authMiddleware, routerAuth)

    return router;
}
