export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET ?? '__JWT_SECRET__',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '3600s',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? '__JWT_REFRESH_SECRET__',
  },
});
