import { Router, static as static_ } from "express"
import path from "path"
import { AuthController } from "../controllers/auth-controller"

export function fileServer(auth: AuthController): Router {
    const r = Router()
    r.use(static_(path.join(__dirname, '../../public')))
    r.use("/static/",auth.authMiddleware,static_(path.join(__dirname,'../../static')))

    return r
}
