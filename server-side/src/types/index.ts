export interface ConfigVariables {
  isProduction: boolean
  isDevelop: boolean
  appName: string
  apiVersion: string
  port: number
  apiKey: string
  secretKey: string
  tokenExpires: string
  timeZonw: string
  database: DatabaseConfig
}

export interface DatabaseConfig {
  type: string
  host: string
  port: number
  username: string
  password: string
  name: string
}
