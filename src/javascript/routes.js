const YAML      = require("js-yaml")
const { Nodes } = require("./util/db.js")
const { extend }  = require("lodash")
const config    = require("./util/yaml-config.js")("config.yml")
const logger    = require('./util/logger.js').logger
const requestIp = require('request-ip');

const {
    sendProxyRequest,
    holdWebservice,
    unholdWebservice
} = require("./services")

const getRequestParams = request => extend({}, request.params, request.query, request.body)

const sanitizeState = state => {
    if(state){
        let res = extend({}, state)
        // res.microservices.forEach( item => {
        //     delete item.instance
        // })
        return res
    }
    return {}

}


/**
 * @param {Object} req
 * @param {String} req.output Формат відповіді від сервісу 
 * @param {Object} res
 * @return {Promise}
 */
const sendResponse = (req, res) => {

    let data = sanitizeState(Nodes.get())
    let p = getRequestParams(req)
    let format = p.output || "json"
    if( format == "yaml" || format == "yml") {
        res.send(YAML.dump(data))    
    } else {
        res.send(data)
    } 

}
/**
 * @param {Object} req
 * @param {String} req.output Формат відповіді від сервісу 
 * @param {Object} res
 * @return {Promise}
 */
 const sendInstanceResponse = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try{
        let p = getRequestParams(req)
        const id  = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        sendProxyRequest(id, '/state', 'get')
            .then(value =>{
                res.send(value)
            })
            .catch(value =>{
                res.send(value)
            })
    }catch (e) {
        logger.error(`Error ${e} from ${clientIp}`)
        res.status(400).send({
            message: e.toString()
        })
    }

}
/**
 * @param {Object} req
 * @param {String} req.uri      uri сервісу
 * @param {String} req.token    token для аутентифікації
 * @param {String} req.instance Ідентифікатор ноди
 * @param {Object} res
 * @return {Promise}
 */
const registerWebservice = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try{
        let p = getRequestParams(req)
        const token = p.token
        const uri   = p.uri
        const instance  = p.instance 
        if(token == undefined || uri == undefined || instance == undefined){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        if(token != config.service.token){
            res.status(400).send({
                message: 'Token is incorrect'
            })
            logger.error(`Token is incorrect from request ${clientIp}`)
            return
        }
        holdWebservice(instance, uri)
        res.status(200).send({
            message: 'Success'
        })
        logger.info(`Webservice with uri: ${uri}, instance: ${instance} reqister success from ${clientIp}`)

    }catch (e) {
        logger.error(`Error ${e} from ${clientIp}`)
        res.status(400).send({
            message: e.toString()
        })
    }
}

/**
 * @param {Object} req
 * @param {String} req.token    token для аутентифікації
 * @param {String} req.instance Ідентифікатор ноди
 * @param {Object} res
 * @return {Promise}
 */
 const unregisterWebservice = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try{
        let p = getRequestParams(req)
        const token     = p.token
        const instance  = p.instance 
        if(token == undefined || instance == undefined){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        if(token != config.service.token){
            res.status(400).send({
                message: 'Token is incorrect'
            })
            logger.error(`Token is incorrect from request ${clientIp}`)
            return
        }
        let items = Nodes.get(m => m.instance == instance)
        if(!items || items.length == 0){
            res.status(400).send({
                message: `Instance with id ${instance} not found`
            })
            logger.error(`Instance with id ${instance} not found from request ${clientIp}`)
            return 
        }
        unholdWebservice(instance)
        res.status(200).send({
            message: 'Success'
        })
        logger.info(`Webservice instance: ${instance} unreqister success from ${clientIp}`)

    }catch (e) {
        logger.error(`Error ${e} from ${clientIp}`)
        res.status(400).send({
            message: e.toString()
        })
    }
}


/**
 * @param {Object} req
 * @param {String} req.id       Ідентифікатор ноди
 * @param {String} req.instance Ідентифікатор сервісу, для завантаження
 * @param {String} req.repo
 * @param {Object} res
 * @return {Promise}
 */
const deployMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
        let p = getRequestParams(req)
        const repo      = p.repo
        const instance  = p.instance 
        const id        = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        if(!repo){
            res.status(400).send({
                message: 'Required parameter "repo" is undefined'
            })
            logger.error(`Required parameter "repo" is undefined from ${clientIp}`)
            return
        }
        let data = {
            repo
        }
        if(instance){
            data['id'] = instance
        }
        
        sendProxyRequest(id, '/deploy', 'post', data)
        .then(value =>{
            res.send(value)
        })
        .catch(value =>{
            res.send(value)
        })
    
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }
    
}

/**
 * @param {Object} req
 * @param {String} req.id       Ідентифікатор ноди
 * @param {String} req.instance Ідентифікатор сервісу, для запуску
 * @param {String} req.service  Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const startMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
        let p = getRequestParams(req)
        const id        = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        const instance  = p.instance
        const service   = p.service 
        if(!instance || !service){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: instance,
            service
        }
        sendProxyRequest(id, '/start', 'post', data)
        .then(value =>{
            res.send(value)
        })
        .catch(value =>{
            res.send(value)
        }) 
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }    

}

/**
 * @param {Object} req
 * @param {String} req.id  Ідентифікатор ноди
 * @param {String} req.instance  Ідентифікатор сервісу, для зупинки
 * @param {Object} res
 * @return {Promise}
 */
const terminateMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
    
        let p = getRequestParams(req)
        const id        = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        const instance  = p.instance
        if(!instance){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: instance
        }
        sendProxyRequest(id, '/terminate', 'post', data)
        .then(value =>{
            res.send(value)
        })
        .catch(value =>{
            res.send(value)
        })    
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }

}


/**
 * @param {Object} req
 * @param {String} req.id        Ідентифікатор ноди
 * @param {String} req.instance  Ідентифікатор сервісу, для вивантаження
 * @param {Object} res
 * @return {Promise}
 */
const undeployMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
    
        let p = getRequestParams(req)
        const id        = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        const instance  = p.instance
        if(!instance){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: instance
        }
        sendProxyRequest(id, '/undeploy', 'post', data)
        .then(value =>{
            res.send(value)
        })
        .catch(value =>{
            res.send(value)
        })   
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }

}

/**
 * @param {Object} req
 * @param {String} req.id        Ідентифікатор ноди
 * @param {String} req.instance  Ідентифікатор сервісу, для налашування
 * @param {String} req.service   Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const setMicroserviceConfigHandler = (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {

        let p = getRequestParams(req)
        const id        = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        const instance  = p.instance
        const service   = p.service 
        if(!instance || !service){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: instance,
            service
        }
        sendProxyRequest(id, '/config', 'post', data)
        .then(value =>{
            res.send(value)
        })
        .catch(value =>{
            res.send(value)
        })    
        
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }     
    
} 

module.exports = [
    {
        method: "get",
        path: "/state",
        handler: sendResponse
    },
    {
        method: "post",
        path: "/register",
        handler: registerWebservice
    },
    {
        method: "post",
        path: "/unregister",
        handler: unregisterWebservice
    },
    
    {
        method: "get",
        path: "/state/:id",
        handler: sendInstanceResponse
    },
    {
        method: "post",
        path: "/deploy/:id",
        handler: deployMicroserviceHandler
    },
    {
        method: "post",
        path: "/undeploy/:id",
        handler: undeployMicroserviceHandler
    },
    {
        method: "post",
        path: "/start/:id",
        handler: startMicroserviceHandler
    },
    {
        method: "post",
        path: "/config/:id",
        handler: setMicroserviceConfigHandler
    },
    {
        method: "post",
        path: "/terminate/:id",
        handler: terminateMicroserviceHandler
    },
    /*
    {
        method: "get",
        path: "/deploy/:id",
        handler: deployMicroserviceHandler
    },
    */
    /*
    {
        method: "get",
        path: "/deploy",
        handler: deployMicroserviceHandler
    },
    */
    
   /*
    {
        method: "post",
        path: "/deploy",
        handler: deployMicroserviceHandler
    },
    */
    /*
    {
        method: "get",
        path: "/undeploy/:id",
        handler: undeployMicroserviceHandler
    },
    */
    /*
    {
        method: "get",
        path: "/undeploy",
        handler: undeployMicroserviceHandler
    },
    */
    /*
    {
        method: "post",
        path: "/undeploy",
        handler: undeployMicroserviceHandler
    },
    {
        method: "post",
        path: "/start",
        handler: startMicroserviceHandler
    },
    */
    /*
    {
        method: "get",
        path: "/start",
        handler: startMicroserviceHandler
    },

    {
        method: "get",
        path: "/start/:id",
        handler: startMicroserviceHandler
    },
    */
   /*
    {
        method: "post",
        path: "/config",
        handler: setMicroserviceConfigHandler
    },
    */
  
    /*
    {
        method: "post",
        path: "/terminate",
        handler: terminateMicroserviceHandler
    },
    */
    /*
    {
        method: "get",
        path: "/terminate",
        handler: terminateMicroserviceHandler
    },
    */
   /*
    {
        method: "get",
        path: "/terminate/:id",
        handler: terminateMicroserviceHandler
    }
    */

]