export default () => ({
  port: parseInt(process.env.PORT_V2, 10) || 6000,
  connectionUrl: process.env.CONNECTION_URL_V2,
});
