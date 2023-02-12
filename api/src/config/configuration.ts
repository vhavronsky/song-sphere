export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appTitle: process.env.APP_TITLE || 'SongSphere',
  appUrlPrefix: process.env.APP_URL_PREFIX || 'api',
  database: {
    uri: process.env.MONGODB_URI,
  },
});
