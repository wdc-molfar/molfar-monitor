const YAML        = require("js-yaml")
const { Nodes, Metrics }   = require("./util/db.js")
const { extend }  = require("lodash")
const config      = require("./util/yaml-config.js")("config.yml")
const logger      = require('./util/logger.js').logger
const requestIp   = require('request-ip')

const {
    sendProxyRequest,
    holdWebservice,
    unholdWebservice
} = require("./services")

const getRequestParams = request => extend({}, request.params, request.query, request.body)

const sanitizeState = state => {
    let res = {}
    if(state){
        res = extend({}, state)
        // res.microservices.forEach( item => {
        //     delete item.instance
        // })
    }
    return res
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
 * @param {String} req.output   Формат відповіді від сервісу
 * @param {String} req.instance Ідентифікатор ноди 
 * @param {Object} res
 * @return {Promise}
 */
 const sendInstanceResponse = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try{
        let p = getRequestParams(req)
        const instance  = p.instance
        let items = Nodes.get(m => m.instance == instance)
        if(!items || items.length == 0){
            res.status(400).send({
                message: `Instance with id ${instance} not found`
            })
            logger.error(`Instance with id ${instance} not found from request ${clientIp}`)
            return 
        }
        sendProxyRequest(instance, '/state', 'get')
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
        if(token.length == 0 || uri.length == 0 || instance.length == 0){
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
        if(token.length == 0 || instance.length == 0){
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
 * @param {String} req.id       Ідентифікатор сервісу, для завантаження
 * @param {String} req.instance Ідентифікатор ноди
 * @param {String} req.repo
 * @param {Object} res
 * @return {Promise}
 */
const deployMicroserviceHandler = async (req, res) => {
    try {
        let p = getRequestParams(req)
        const repo      = p.repo
        const instance  = p.instance 
        const id        = p.id
        let data = id ? {repo, id} : {repo}
        sendProxyRequest(instance, '/deploy', 'post', data)
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
 * @param {String} req.id       Ідентифікатор сервісу, для запуску 
 * @param {String} req.instance Ідентифікатор ноди
 * @param {String} req.service  Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const startMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
        let p = getRequestParams(req)
        const instance        = p.instance
        const id  = p.id
        const service   = p.service 
        if(id.length == 0 || service.length == 0){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        sendProxyRequest(instance, '/start', 'post', {id, service})
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
 * @param {String} req.id  Ідентифікатор сервісу, для зупинки 
 * @param {String} req.instance  Ідентифікатор ноди
 * @param {Object} res
 * @return {Promise}
 */
const terminateMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
    
        let p = getRequestParams(req)
        const instance  = p.instance
        const id  = p.id
        if(id.length == 0){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: id
        }
        sendProxyRequest(instance, '/terminate', 'post', data)
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
 * @param {String} req.id        Ідентифікатор сервісу, для вивантаження
 * @param {Object} res
 * @return {Promise}
 */
const undeployMicroserviceHandler = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {
    
        let p = getRequestParams(req)
        const instance        = p.instance
        const id  = p.id
        if(id.length == 0){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id: id
        }
        sendProxyRequest(instance, '/undeploy', 'post', data)
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
 * @param {String} req.id        Ідентифікатор сервісу, для налашування
 * @param {String} req.instance  Ідентифікатор ноди
 * @param {String} req.service   Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const setMicroserviceConfigHandler = (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try {

        let p = getRequestParams(req)
        const instance = p.instance
        const id  = p.id
        const service   = p.service 
        if(id.length == 0 || service.length == 0){
            res.status(400).send({
                message: 'Required parameters is undefined'
            })
            logger.error(`Required parameters is undefined from ${clientIp}`)
            return
        }
        let data = {
            id,
            service
        }
        sendProxyRequest(instance, '/config', 'post', data)
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


/** Повертає метрики стану мікросервісу
 * @param {Object} req
 * @param {String} req.id        Ідентифікатор мікросервісу, для налашування
 * @param {Object} res
 * @return {Promise}
 */

 const getMsMetrics = ( req, res ) => {
    try {
        let p = getRequestParams(req)
        let result = Metrics.get( item => item.instance == p.id )
        if(result){
            res.send(result)    
        } else {
            res.status(400).send({
                message: `Metrics for ms instance "${p.id}" not found`
            })    
        }
        
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
        path: "/node/register",
        handler: registerWebservice
    },
    {
        method: "post",
        path: "/node/unregister",
        handler: unregisterWebservice
    },
    
    {
        method: "get",
        path: "/node/state/:instance",
        handler: sendInstanceResponse
    },
    {
        method: "post",
        path: "/node/deploy/:instance",
        handler: deployMicroserviceHandler
    },
    {
        method: "post",
        path: "/node/undeploy/:instance",
        handler: undeployMicroserviceHandler
    },
    {
        method: "post",
        path: "/ms/start/:id",
        handler: startMicroserviceHandler
    },
    {
        method: "post",
        path: "/ms/config/:id",
        handler: setMicroserviceConfigHandler
    },
    {
        method: "post",
        path: "/ms/terminate/:id",
        handler: terminateMicroserviceHandler
    },
    {
        method: "get",
        path: "/ms/metrics/:id",
        handler: getMsMetrics
    }
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