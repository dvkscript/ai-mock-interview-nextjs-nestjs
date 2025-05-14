import { get } from 'env-var';
import { Dialect } from 'sequelize'
import '../libs/utils/dotenv';

export default {
    db: {
        dialect: get('DB_DIALECT').required().asString() as Dialect,
        host: get('DB_HOST').required().asString(),
        port: get('DB_PORT').required().asIntPositive(),
        username: get('DB_USERNAME').required().asString(),
        password: get('DB_PASSWORD').required().asString(),
        database: get('DB_NAME').required().asString(),
    },
    system: {
        defaultApi: get("DEFAULT_API").required().asString(),
        gatewayApi: get("GATEWAY_API").required().asString(),
        googleClientId: get("GOOGLE_CLIENT_ID").required().asString(),
        googleClientSecret: get("GOOGLE_CLIENT_SECRET").required().asString(),
        githubClientId: get("GITHUB_CLIENT_ID").required().asString(),
        githubClientSecret: get("GITHUB_CLIENT_SECRET").required().asString(),
        nodeEnv: get("NODE_ENV").required().asString() // "development" | "production"
    },
    jwt: {
        accessSecret: get('JWT_ACCESS_SECRET').required().asString(),
        accessExpires: get('JWT_ACCESS_EXPIRES').required().asString(),
        refreshSecret: get('JWT_REFRESH_SECRET').required().asString(),
        refreshExpires: get('JWT_REFRESH_EXPIRES').required().asString(),
    },
}