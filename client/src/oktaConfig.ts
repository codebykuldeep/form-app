import { oktaConstant } from "./constants";

export const oktaConfig = {
    clientId: oktaConstant.CLIENT_ID,
    issuer: `https://${oktaConstant.DOAMIN}/oauth2/default`,
    redirectUri: `http://localhost:3000/login/callback`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
}; 