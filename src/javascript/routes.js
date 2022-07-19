
const YAML = require("js-yaml")
const container = require("./util/local-container")
const {v4} = require("uuid")
const {extend, find} = require("lodash")
const config  = require("./util/yaml-config.js")("config.yml")
const logger = require('./util/logger.js').logger
const requestIp = require('request-ip');

const {
    getStatusWebservice,
    holdWebservice,
    unholdWebservice,
    deployMicroservice,
    startMicroservice,
    setMicroserviceConfig,
    terminateMicroservice,
    undeployMicroservice
} = require("./services")

const getRequestParams = request => extend({}, request.params, request.query, request.body)

const sanitizeState = state => {
    
    let res = extend({}, state)
    // res.microservices.forEach( item => {
    //     delete item.instance
    // })
    return res

}


/**
 * @param {Object} req
 * @param {String} req.output Формат відповіді від сервісу 
 * @param {Object} res
 * @return {Promise}
 */
const sendResponse = (req, res) => {

    let data = sanitizeState(container().state)
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
        const id   = p.id
        if(!id){
            logger.error(`Error Id incorrect from ${clientIp}`)
            res.status(400).send({
                message: "Id incorrect"
            })
            return 
        }
        getStatusWebservice(id)
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
 * @param {String} req.uri  uri сервісу
 * @param {String} req.token token для аутентифікації
 * @param {String} req.instance id сервісу
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
 * @param {String} req.token token для аутентифікації
 * @param {String} req.instance id сервісу
 * @param {Object} res
 * @return {Promise}
 */
 const unregisterWebservice = async (req, res) => {
    const clientIp = requestIp.getClientIp(req)
    try{
        let p = getRequestParams(req)
        const token = p.token
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
        if(!find(container().state.webservices, m => m.id == instance)){
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
 * @param {String} req.id  Ідентифікатор сервісу, для завантаження
 * @param {String} req.repo
 * @param {Object} res
 * @return {Promise}
 */
const deployMicroserviceHandler = async (req, res) => {
    try {

        let p = getRequestParams(req)
        let id = p.id || v4()
        let repo = p.repo

        await deployMicroservice(id,repo)
        sendResponse(req, res)    

    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }
    
}

/**
 * @param {Object} req
 * @param {String} req.id      Ідентифікатор сервісу, для запуску
 * @param {String} req.service Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const startMicroserviceHandler = async (req, res) => {
    try {

        let p = getRequestParams(req)
        await startMicroservice(p.id, {service: p.service})
        sendResponse(req, res)   
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }    

}

/**
 * @param {Object} req
 * @param {String} req.id  Ідентифікатор сервісу, для зупинки
 * @param {Object} res
 * @return {Promise}
 */
const terminateMicroserviceHandler = async (req, res) => {
    try {
    
        let p = getRequestParams(req)
        await terminateMicroservice(p.id)
        sendResponse(req, res)   
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }

}


/**
 * @param {Object} req
 * @param {String} req.id  Ідентифікатор сервісу, для вивантаження
 * @param {Object} res
 * @return {Promise}
 */
const undeployMicroserviceHandler = async (req, res) => {
    try {
    
        let p = getRequestParams(req)
        await undeployMicroservice(p.id)
        sendResponse(req, res)   
    } catch (e) {
        res.status(400).send({
            message: e.toString()
        })
    }

}

/**
 * @param {Object} req
 * @param {String} req.id  Ідентифікатор сервісу, для налашування
 * @param {String} req.service  Конфігурація для сервісу
 * @param {Object} res
 * @return {Promise}
 */
const setMicroserviceConfigHandler = (req, res) => {
    try {
        
        let p = getRequestParams(req)
        setMicroserviceConfig( p.id, {service: p.service} )
        sendResponse(req, res)    
        
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