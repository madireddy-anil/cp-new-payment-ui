export const appUrl = process.env.URL
export const auth0Domain = process.env.AUTH0_DOMAIN || ''
export const auth0ClientId = process.env.AUTH0_CLIENT_ID || ''
export const auth0Audience = process.env.AUTH0_AUDIENCE
export const auth0Scope = process.env.AUTH0_SCOPE
export const auth0Redirection = process.env.AUTH0_REDIRECTION_URL
export const userManagementAPI = process.env.CC_MANAGEMENT_API_URL
export const logoutUrl = process.env.LOGOUT_URL || ''
export const revokeTokenUrl = process.env.AUTH0_REVOKE_TOKEN_API_URL
export const userMetaData = 'https://app.eu.payconstruct.com/user_metadata'
export const LTRLanguages = ['ar-AA']
export const environment = process.env.REACT_APP_ENV || 'tst'
export const newPayment = process.env.REACT_APP_PAYMENT_API_URL || 'https://pay-engine.tst.getorbital.com/payments'

export const region = process.env.REGION || ''
export const graphQLHttpURL = process.env.GRAPHQL_HTTP_URL || ''
export const graphQLWebSocketUrl = process.env.GRAPHQL_WEBSOCKET_URL || ''

export const cyAuthUserName = process.env.CY_USER_NAME
export const cyAuthUserPassword = process.env.CY_USER_PASSWORD

export const cyAuthUserName_2 = process.env.CY_USER_NAME_2
export const cyAuthUserPassword_2 = process.env.CY_USER_PASSWORD_2

export const CYPRESS_PROJECT_ID = process.env.CYPRESS_PROJECT_ID
