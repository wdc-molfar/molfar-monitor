const container = require("./util/local-container")
const {v4} = require("uuid")
const path = require("path")
const config = require("./util/yaml-config.js")("config.yml")
const {find, remove} = require("lodash")
const fse = require("fs-extra") 
const axios = require('axios')
const https = require('https')
const e = require("express")
const logger = require('./util/logger.js').logger

const getStatusWebservice = async (id) => {
    try{
        const webservices = container().get()
        if(webservices){
            let f = find(webservices,  m => m.id == id)
            if(f){
                const uri = f.uri
                return await getInstanceState(uri)
                    .then(value =>{
                        return value.data
                    })
                    .catch(value =>{
                        if(value && value.isAxiosError){
                            let answer =  {
                                message: `HTTP answer - ${value.status ? value.status : value.code}`
                            }
                            return answer
                        }else if(value.status){
                            let answer =  {
                                message: `HTTP answer - ${value.status}`
                            }
                            return answer
                        }
                        else{
                            return {
                                message: `Error in process get Webservices with id ${id}`
                            }
                        }
                    })
            }else{
                return new Promise((resolve, reject) => {
                      resolve({
                          message: `Webservices with id ${id} not found`
                      });
                });
            }
            
        }
        return new Promise((resolve, reject) => {
            resolve({
                message: `Webservices is empty`
            });
        });
    }
     catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}

const checkWebservice = () => {
    try{
        const webservices = container().get()
        if(webservices){
            webservices.forEach((value) => {
                const instance = value.id
                getInstanceState(value.uri)
                    .then(value =>{
                        if(value && value.status){
                            if(value.status == 200){
                                if(value.data != undefined){
                                    let f = find(container().state.webservices, m => m.id == instance)
                                    if (f) {
                                        f.state = "available"
                                        f.seenAt  = new Date()
                                        f.microservices = value.data.microservices != undefined ? value.data.microservices : []
                                        container().saveState()
                                    }else{
                                        logger.error(`Not found instance with id ${instance}`)
                                    }    
                                }
                            }else{
                                let f = find(container().state.webservices, m => m.id == instance)
                                if (f) {
                                    f.state = "unavailable"
                                    f.seenAt  = new Date()
                                    container().saveState()
                                }else{
                                    logger.error(`Not found instance with id ${instance}`)
                                }    
                            }
                        }else{
                            let f = find(container().state.webservices, m => m.id == instance)
                            if (f) {
                                f.state = "error"
                                f.seenAt  = new Date()
                                container().saveState()
                            }else{
                                logger.error(`Not found instance with id ${instance}`)
                            }   
                        }
                    })
                    .catch(value =>{
                        if(value && value.isAxiosError){
                            let f = find(container().state.webservices, m => m.id == instance)
                            if (f) {
                                f.state = "unavailable"
                                f.seenAt  = new Date()
                                container().saveState()
                            }else{
                                logger.error(`Not found instance with id ${instance}`)
                            } 
                            return
                        }
                        let f = find(container().state.webservices, m => m.id == instance)
                        if (f) {
                            f.state = "error"
                            f.seenAt  = new Date()
                            container().saveState()
                        }else{
                            logger.error(`Not found instance with id ${instance}`)
                        } 
                        logger.error(value)
                    })
            })
        }
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}

const getInstanceState = async (uri)=>{
    const agent =  new https.Agent({  
           rejectUnauthorized: false
    }) 
    const configuration = {
        method: 'get',
        url: `${uri}/state`,
        httpsAgent : agent,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'},
        responseType: 'json'
    }
    return await axios(configuration)
}


const holdWebservice = (instance, uri) => {
    try{
        container().hold(instance, uri)
    
        let deployed = {
            id: instance,
            uri,
            state: "registered",
            seenAt: new Date(),
            microservices: []
        }
        
        let f = find(container().state.webservices, m => m.id == instance)
        if (f) {
            f = deployed
        } else {
            container().state.webservices.push(deployed)
        }    
        container().saveState()
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}


const unholdWebservice = (instance) => {
    try{
        container().unhold(instance)
    
        remove(container().state.webservices, m => m.id == instance)
        container().saveState()
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}





const DEPLOYMENT_DIR = config.service.deploymentDir

/**
 * @param {String} servicePath Шлях розташування 
 * @param {String} id   Ідентифікатор
 * @return {Promise}
 */
const holdMicroservice = (servicePath, id) => {
	container().hold(servicePath, id)
}

/**
 * @param {String} instance   Ідентифікатор
 * @param {String} uri  Шлях до сервісу
 * @return {Promise}
 */


/**
 * @param {String} id   Ідентифікатор
 * @param {String} repo  Шлях до сервісу
 * @return {Promise}
 */
const deployMicroservice = async (id, repo) => {
    try {

        let deployment = await container().deploy(repo, path.resolve(`${DEPLOYMENT_DIR}/${id}`))
        deployment.at = new Date()
        holdMicroservice(deployment.servicePath, id)

        let deployed = {
            repo,
            id,
            deployment
        }
        
        let f = find(container().state.microservices, m => m.id == id)
        if (f) {
            f = deployed
        } else {
            container().state.microservices.push(deployed)
        }    
        container().saveState()
    } catch (e) {
    	throw new Error(`@Molfar Node Error: ${e.toString()}`)
    }
    
}

/**
 * @param {String} id   Ідентифікатор
 * @return {Promise}
 */
const undeployMicroservice =  async id => {
    try {
        
        let f = find(container().state.microservices, m => m.id == id) 
            
        if(f){
            
            if(f.start) {
                await terminateMicroservice(id)            
            }

            fse.removeSync( path.resolve(`${DEPLOYMENT_DIR}/${id}`) )
            remove(container().state.microservices, item => item.id = id)
            container().saveState()
        } else {
            throw new Error(`Cannot undeploy microservice. Microservice ${id} not found`)
        }

   } catch (e) {
        throw new Error(`@Molfar Node Error: ${e.toString()}`)
   }             

} 

/**
 * @param {String} id   Ідентифікатор
 * @param {Object} config 
 * @return {Promise}
 */
const startMicroservice = async (id, config)  => {
    try {
        

        if(config.service){
        	setMicroserviceConfig(id, config)
        }
        
        let f = find(container().state.microservices, m => m.id == id)
        
        if(f){
            
            if(f.start) {
                return            
            }

            let log = {}
            const worker = await container().startInstance(container().getService(s => s.name == id))
            console.log(f.config)
            let result = await worker.configure( f.config )    
            log.configure = result
            result = await worker.start()
            log.start = result

            f.start = {
                log,
                at: new Date()
            }

            container().saveState()
        } else {
            throw new Error(`Cannot start microservice. Microservice ${id} not found`)
        }
    } catch (e) {
        throw new Error(`@Molfar Node Error: ${e.toString()}`)
    }    

}

/**
 * @param {String} id   Ідентифікатор
 * @return {Promise}
 */
const terminateMicroservice = async id => {
    try {
        
        let f = find(container().state.microservices, m => m.id == id)
        if(f){ 
            
            if(!f.start) {
                return            
            }
            
            const worker = await container().startInstance(container().getService(s => s.name == id))
            await worker.stop()

            container().terminateInstance(worker)
            
            delete f.start
            
            container().saveState()
        } else {
            throw new Error(`Cannot terminate microservice. Microservice ${id} not found`)
        }
    
    } catch (e) {
    
        throw new Error(`@Molfar Node Error: ${e.toString()}`)
    
    }
}


/**
 * @param {String} id   Ідентифікатор
 * @param {Object} config 
 * @return {Promise}
 */
const setMicroserviceConfig = (id, config) => {
    try {
        
        let f = find(container().state.microservices, m => m.id == id)
        if(f){
            f.config = config
            container().saveState()
        } else {
            throw new Error(`Cannot configure microservice. Microservice ${id} not found`)
        }

    } catch (e) {

        throw new Error(`@Molfar Node Error: ${e.toString()}`)
    
    }     
    
} 


module.exports = {
    getStatusWebservice,
    checkWebservice,
    holdWebservice,
    unholdWebservice,
	deployMicroservice,
	startMicroservice,
	setMicroserviceConfig,
	terminateMicroservice,
	holdMicroservice, 
    undeployMicroservice
}