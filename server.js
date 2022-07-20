const app = require('./src/javascript')
const http = require('http')
const config = require("./src/javascript/util/yaml-config.js")("./config.yml")

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.fatal(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.fatal(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening => () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.debug(`!!!  MOLFAR-Monitor SERVICE starts on ${bind} in ${config.service.mode} mode.`);
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || config.service.port || '8080')
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const startServer = async () => {
  
  const { Metrics } = require("./src/javascript/util/db")
  const metricsListener = require("./src/javascript/util/metrics-listener")(config)
  const nodeMonitor =  require("./src/javascript/util/node-monitor") 

  nodeMonitor.start(config)
  
  await metricsListener
    .onMetrics( m => {
      Metrics.getOrCreate( d => d.instance == m.instance, m)
    })
    .start()

   server.listen(port);
   server.on('error', onError);
   server.on('listening', onListening);
  
} 

startServer()

module.exports = server