/*
  !!! HOW TO RUN THIS EXAMPLE

  1. Clone and activate dummy microservice

  git clone https://github.com/wdc-molfar/service-chassis
  npm i
  cd ./example
  node start-scheduler

  Metrics data stream will be produced

  2. Run this script at the root of project

  node ./src/javascript/util/!how-to-use-utils
  
  3. Push ctrl+c for terminate this script

  4. See metrics collection content in "./collections/metrics.json"   


*/


const run = async () => {

  const { Metrics } = require("./db")
  const config = require("./yaml-config")("./config.yml")
  const monitor = require("./metrics-listener")(config)
  
  await monitor
    .onMetrics( m => {
      Metrics.getOrCreate( d => d.instance == m.instance, m)
    })
    .start()
}

run()