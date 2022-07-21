const axios = require("axios")
const { Nodes } = require("./db.js")

let interval

const startNodeMonitor = config => {
  const t = config["node-monitor"].interval || 6000 // 1min = 6000ms as default time interval
  interval = setInterval( async() => {
    
    // get all items inside the collection Nodes
   
    const nodes = Nodes.get()
    if(nodes){
      for(let i = 0; i < nodes.length; i++){
      
        const node = nodes[i]
        
        // "https://tra.ta.ta/status" for node.url = "https://tra.ta.ta/" ans config["node-monitor"].request = "/status"
        let monitoringData = await axios(`${node.uri}${config["node-monitor"].request}`) 
          .then(value => {
              if(value && value.status){
                if( value.status == 200 ){
                  Nodes.update((data) => {
                    data.type          = value.data.type
                    data.status        = value.status
                    data.updatedAt     = new Date()
                    data.startedAt     = value.data.startedAt
                    data.microservices = value.data.microservices
                  }, d => d.instance == node.instance)
                } else {
                  Nodes.update((data) => {
                    data.status        = value.status
                    data.updatedAt     = new Date()
                  }, d => d.instance == node.instance)
                }
              }else{
                Nodes.update((data) => {
                  data.status        = -1
                  data.updatedAt     = new Date()
                }, d => d.instance == node.instance)
              }
          })
          .catch(value => {
            if(value && value.status){
              Nodes.update((data) => {
                data.status        = value.status
                data.updatedAt     = new Date()
              }, d => d.instance == node.instance)
            }else{
              Nodes.update((data) => {
                data.status        = -1
                data.updatedAt     = new Date()
              }, d => d.instance == node.instance)
            }
          })
        
      
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