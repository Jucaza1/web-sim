import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { CompanyController } from "../controllers/company-controller";

export function createRouter(userController: UserController, companyController: CompanyController) {
    const router = Router();
    //-> /api/v1
    // User routes
    router.get("/users/:id", userController.getUser)
    router.get("/users", userController.getUsers)
    router.post("/users", userController.createUser)
    router.put("/users/:id", userController.updateUser)
    router.delete("/users/:id", userController.deleteUser)

    // Company routes
    router.get("/companies/:id", companyController.getCompany)
    router.get("/companies", companyController.getCompanies)
    router.post("/companies", companyController.createCompany)
    router.put("/companies/:id", companyController.updateCompany)
    router.delete("/companies/:id", companyController.deleteCompany)

    return router;
}
