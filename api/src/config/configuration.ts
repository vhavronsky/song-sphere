export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appTitle: process.env.APP_TITLE || 'SongSphere',
  database: {
    uri: process.env.MONGODB_URI,
  },
});
