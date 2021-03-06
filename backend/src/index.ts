import express from 'express'
import cors from 'cors'

import winston from 'winston'
import * as OpenApiValidator from 'express-openapi-validator'
import path from 'path'

const logger = winston.createLogger()

const app = express()
const PORT: number = 4000

app.use(cors())

app.use(
  OpenApiValidator.middleware({
    apiSpec: './src/openapi.yaml',
    validateRequests: true,
    validateResponses: true,
    operationHandlers: path.join(__dirname),
  })
)

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  })
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

export { app }
