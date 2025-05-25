import { Request, Response, Router, static as static_ } from "express"
import path from "path"
import { AuthController } from "../controllers/auth-controller"
import { NextFunction } from "../types/express"

export function fileServer(auth: AuthController): Router {
    const r = Router()
    r.get(/\.(wasm|js|data)\.gz$/, (req, res, next) => {
        res.set('Content-Encoding', 'gzip')

        if (req.url.endsWith('.wasm.gz')) {
            res.set('Content-Type', 'application/wasm')
        } else if (req.url.endsWith('.js.gz')) {
            res.set('Content-Type', 'application/javascript')
        } else if (req.url.endsWith('.data.gz')) {
            res.set('Content-Type', 'application/octet-stream')
        } else if (req.url.endsWith('.framework.js.gz')) {
            res.set('Content-Type', 'application/javascript')
        }
        next()
    })
    r.use(static_(path.join(__dirname, '../../../public')))
    r.use("/static/",
        auth.authMiddleware,
        contentTypeMiddleware,
        static_(path.join(__dirname, '../../../static')))
    r.get(/^\/(?!api|static).*/, (_req, res) => {
        res.sendFile(path.join(__dirname, "../../../public", "index.html"));
    })
    return r
}
function contentTypeMiddleware(req: Request, res: Response, next: NextFunction) {
    // Set content encoding depending on compression
    next()
    return
    if (req.method !== 'GET') {
        next()
        return
    }
    const path = req.url
    if (path.endsWith('.br')) {
        res.set('Content-Encoding', 'br');
    } else if (path.endsWith('.gz')) {
        res.set('Content-Encoding', 'gzip');
    }

    // Explicitly set content type. Files can have wrong content type if build uses compression.
    if (path.includes('.wasm')) {
        res.set('Content-Type', 'application/wasm');
    } else if (path.includes('.js')) {
        res.set('Content-Type', 'application/javascript');
    } else if (path.includes('.json')) {
        res.set('Content-Type', 'application/json');
    } else if (
        path.includes('.data') ||
        path.includes('.bundle') ||
        path.endsWith('.unityweb')
    ) {
        res.set('Content-Type', 'application/octet-stream');
    }

    // Ignore cache-control: no-cache
    // when if-modified-since or if-none-match is set
    // because Unity Loader will cache and revalidate manually
    if (req.headers['cache-control'] == 'no-cache' &&
        (
            req.headers['if-modified-since'] ||
            req.headers['if-none-match']
        )
    ) {
        delete req.headers['cache-control'];
    }
    next()
}
