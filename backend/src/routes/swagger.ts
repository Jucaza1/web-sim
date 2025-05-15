import swaggerUi, { SwaggerOptions } from "swagger-ui-express"
import { Router } from "express"
import YAML from "yamljs"
import path from "path"

export function swaggerRouter() {
    const router = Router()
    const swaggerDocument = YAML.load(path.join(__dirname, "../../../docs/openapi.yml"))
    const options: SwaggerOptions = {
        customJs: "/swagger-response-interceptor.js",
    }
    router.use(swaggerUi.serve)
    router.use(swaggerUi.setup(swaggerDocument, options))
    return router
}
