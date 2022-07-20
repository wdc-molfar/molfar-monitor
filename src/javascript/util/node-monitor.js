const axios = require("axios")
const { Nodes } = require("db")
const { extend } = require("lodash")

let interval

const startNodeMonitor = config => {
  const t = config["node-monitor"].interval || 6000 // 1min = 6000ms as default time interval
  interval = setInterval( async() => {
    
    // get all items inside the collection Nodes
    const nodes = Nodes.get()
    
    for(let i = 0; i < nodes.length; i++){
    
      const node = nodes[i]
      
      // "https://tra.ta.ta/status" for node.url = "https://tra.ta.ta/" ans config["node-monitor"].request = "/status"
      let monitoringData = await axios(`${node.url}${config["node-monitor"].request}`) 
      if( monitoringData.status == 200){
        
        // getOrCreate( filter, newData) updates collection items
        // or d.id == node.id 
        Nodes.getOrCreate(d => d.url == node.url, extend({}, monitoringData.data, { status: monitoringData.status, updatedAt: new Date()}))
      } else {
        Nodes.getOrCreate(d => d.url == node.url, extend({}, { status: monitoringData.status, updatedAt: new Date()}))
      }
    
    }

  }, t)
}

const stopNodeMonitor = () => {
  clearInterval(interval)
}


module.exports = {
  start: startNodeMonitor,
  stop: stopNodeMonitor
}