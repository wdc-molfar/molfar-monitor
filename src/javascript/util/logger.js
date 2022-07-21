/**
 * Configurations of logger.
 */
 const winston = require('winston')
 const winstonRotator = require('winston-daily-rotate-file')
 const path = require("path")
 const fs = require("fs")
 const fse = require("fs-extra")
 const dir = './logs'

 const init =  () => {
    let logDir = path.resolve(dir)
    if(!fse.pathExistsSync(logDir)){
      console.log("Dir created")
      fse.mkdirsSync(path.dirname(logDir))
    }
  }
 
 
 var logger = new winston.createLogger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      name: 'access-file',
      level: 'info',
      filename: `${dir}/access.log`,
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10
    }),
    new (winston.transports.DailyRotateFile)({
      name: 'error-file',
      level: 'error',
      filename: `${dir}/error.log`,
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10
    })
  ]
})

init()

module.exports = {
  logger
}
