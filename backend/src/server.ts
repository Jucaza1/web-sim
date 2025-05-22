import app from './app'
import logger from './logger'

const PORT: number = process.env.SERVER_PORT as (number | undefined) || 3000
const HOST = process.env.SERVER_HOST || 'localhost'

app.listen(PORT, HOST, () => {
    logger.info(`Server is running on http://${HOST}:${PORT}`)
})
