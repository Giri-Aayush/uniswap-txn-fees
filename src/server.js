const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const database = require('./config/database');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

database.connect().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});