module.exports = {
  apps: [
    {
      name: 'api',
      script: 'server.js',
      watch: true,
      watch_options: {
        usePolling: true,
        interval: 100
      }
    }
  ]
};
