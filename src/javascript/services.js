const container = require("./util/container")
const {v4} = require("uuid")
const path = require("path")
const config = require("../../config")
const {find, remove, extend, isString} = require("lodash")
const fse = require("fs-extra") 

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
	deployMicroservice,
	startMicroservice,
	setMicroserviceConfig,
	terminateMicroservice,
	holdMicroservice, 
    undeployMicroservice
}