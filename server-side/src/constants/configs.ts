import * as dotenv from 'dotenv'
dotenv.config({
  path: '.env.local'
})

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelop = process.env.NODE_ENV === 'development'
export const appName = process.env.APP_NAME || 'project_alice'
export const apiVersion = String(process.env.APP_API_VERSION || 1)
export const port = parseInt(process.env.APP_SERVER_PORT, 10) || 3030
export const apiKey = process.env.API_SECRET_KEY || ''
export const secretKey = process.env.APP_JWT_SECRET || ''
export const tokenExpires = process.env.APP_JWT_TTL || '1d'
export const timeZonw = process.env.TZ || 'Asia/Bangkok'

export const database = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME
}
