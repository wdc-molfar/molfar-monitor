
const {Container}  = require("@molfar/csc")
const config = require("../../../config")
const {v4} = require("uuid")
const {extend} = require("lodash")
const {State} = require("./local-state")

let container 
const s = new State({
    filename: "./.state/data.json",
    initialState: {
            type: "@molfar/molfar-node",
            uri: config.service.usePort ? `http://${config.service.host}:${config.service.port}` : `http://${config.service.host}`,
            instance: v4(),
            startedAt: new Date(),
            microservices:[]
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