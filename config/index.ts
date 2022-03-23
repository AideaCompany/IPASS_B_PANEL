// Configuration
import config from './config.json'

interface iSecurity {
  secretKey: string
  expiresIn: string
}

// Configurations
const { security } = config

export const $security: iSecurity = security
