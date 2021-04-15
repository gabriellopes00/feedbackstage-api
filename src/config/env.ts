import 'dotenv/config'

const port = process.env.PORT
const apiLogRequests = process.env.API_LOG_REQUESTS
const apiLogErrors = process.env.API_LOG_ERRORS

const dbPort = process.env.DB_PORT
const dbUserName = process.env.DB_USER_NAME
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const dbHost = process.env.DB_HOST

const maxFeedbackRequests = process.env.MAX_FEEDBACK_REQUESTS
const maxNPSRequests = process.env.MAX_FEEDBACK_REQUESTS

const tokenSecretKey = process.env.TOKEN_SECRET_KEY

const nodeEnv = process.env.NODE_ENV

export {
  port,
  apiLogErrors,
  apiLogRequests,
  dbHost,
  dbUserName,
  dbPort,
  dbPassword,
  dbName,
  maxFeedbackRequests,
  maxNPSRequests,
  tokenSecretKey,
  nodeEnv
}