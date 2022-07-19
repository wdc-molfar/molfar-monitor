const {Container}  = require("./container.js")
const config = require("./yaml-config.js")("config.yml")
const {v4} = require("uuid")
const {extend} = require("lodash")
const {State} = require("./local-state")


let container 
const s = new State({
    filename: "./.state/data.json",
    initialState: {
            type: "@molfar/molfar-monitor",
            uri: config.service.usePort ? `${config.service.protocol}://${config.service.host}:${config.service.port}` : `${config.service.protocol}://${config.service.host}`,
            instance: v4(),
            startedAt: new Date(),
            webservices:[]
        },
    beforeSave: data => {
        let res = extend({}, data)
        // res.microservices.forEach( item => {
        //     if(item.instance) delete item.instance
        // })
        return res
    }     
})

module.exports = () => {
    if(!container){
        container = new Container()
        container.state = s.get()
        container.state.startedAt = new Date()
        container.saveState = () => { s.save() }
        container.saveState() 
    }
    return container
}