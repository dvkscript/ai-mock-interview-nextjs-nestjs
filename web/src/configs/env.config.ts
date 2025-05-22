const envConfig = {
  gatewayApi: process.env.SERVER_API_GATEWAY_URL!,
  defaultApi: process.env.SERVER_API_DEFAULT_URL!,
  currentUrl: process.env.CURRENT_URL!,
  stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
}

export default envConfig;