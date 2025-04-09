import { Router } from "express";
import { UserController } from "../controllers/user_controller";
import { CompanyController } from "../controllers/company_controller";

export function createRouter(userController: UserController, companyController: CompanyController) {
    const router = Router();

    // User routes
    router.get("/users/:id", userController.getUser);
    router.get("/users", userController.getUsers);
    router.post("/users", userController.createUser.bind(userController));
    router.put("/users/:id", userController.updateUser.bind(userController));
    router.delete("/users/:id", userController.deleteUser.bind(userController));

    // Company routes
    router.get("/companies/:id", companyController.getCompany.bind(companyController));
    router.get("/companies", companyController.getCompanies.bind(companyController));
    router.post("/companies", companyController.createCompany.bind(companyController));
    router.put("/companies/:id", companyController.updateCompany.bind(companyController));
    router.delete("/companies/:id", companyController.deleteCompany.bind(companyController));

    return router;
}
