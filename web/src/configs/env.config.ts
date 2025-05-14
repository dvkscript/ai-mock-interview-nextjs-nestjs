// import { config } from 'dotenv';
// import * as path from 'path';
// import { get } from 'env-var';

// const envPath = path.resolve(
//   process.cwd(), 
//   process.env.NODE_ENV === 'test' ? '.env' : '.env.development'
// );
// { path: process.env.NODE_ENV === "production" ? undefined : envPath }
// config();


const envConfig = {
  // gatewayApi: get("SERVER_API_GATEWAY_URL").required().asString(),
  // defaultApi: get("SERVER_API_DEFAULT_URL").required().asString(),
  // currentUrl: get("CURRENT_URL").required().asString(),
  gatewayApi: process.env.SERVER_API_GATEWAY_URL!,
  defaultApi: process.env.SERVER_API_DEFAULT_URL!,
  currentUrl: process.env.CURRENT_URL!,
}

export default envConfig;