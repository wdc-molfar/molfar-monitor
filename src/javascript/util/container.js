const {find, remove} = require("lodash")

const ContainerError = class extends Error {
    constructor(message) {
        super(message);
        this.name = "EDQP Container Error";
    }
}

const Container = class{
    
    constructor() { this.q = []; this.events = []; }

    get() { return this.q; }
    
    unhold(instance){ 
        if(instance){
            remove(this.q, s => s.instance == instance)
        }
        return this
    }

    hold(instance, uri){
        if(instance){
            let service = find(this.q, s => s.instance == instance)
            if (!service){
                this.push({
                    id: instance,
                    uri: uri,
                    holdAt: new Date(),
                    seenAt: new Date(),
                    state: "registered",
                    microservices: []
                })
            } else {
                service = {
                    id: instance,
                    uri: uri,
                    holdAt: new Date(),
                    seenAt: new Date(),
                    state: "registered",
                    microservices: []
                } 
                    // throw new ContainerError(`Doublicate holds of "${serviceName}" is not available.`)
            }	
        }
        return this
    }
    
} 

Container.prototype.on = function(name, callback){
    this.events.push({
        name:name,
        callback:callback
    });
}

//push to listbase and emit added event
Container.prototype.push = function(item){
    this.q.push(item);
    this._emit("push", item)
}

Container.prototype._emit = function(evtName, data){
    this.events.forEach(function(event){
        if(evtName === event.name){
            event.callback.call(null, data, this.events);
        }
    }.bind(this));
}

module.exports = {
    Container
}