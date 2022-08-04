const { Nodes } = require("./util/db.js")
const { extend }  = require("lodash")
const axios     = require("axios")
const https     = require("https")

/**
 * @param {String} instance Ідентифікатор ноди
 * @param {String} path     URL шлях для запиту 
 * @param {String} method  Тип запиту POST, GET та інші
 * @param {Object} data    Дані, що надсилаються
 * @return {Promise}
 */
const sendProxyRequest = async (instance, path, method, data) => {
    try{
        let f = Nodes.get( m => m.instance == instance)
        if(f){
            return handlerAxiosRequest(`${f.uri}${path}`, method, data)
        }else{
            return new Promise((resolve) => {
                resolve({
                    message: `Webservices with id ${instance} not found`
                })
            })
        }
    }
     catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}

/**
 * @param {String} uri     URL  для запиту 
 * @param {String} method  Тип запиту POST, GET та інші
 * @param {Object} data    Дані, що надсилаються
 * @return {Promise}
 */
const handlerAxiosRequest = async(uri, method, data) => {
    return await sendAxiosRequest(uri, method, data)
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
}
/**
 * @param {String} uri     URL  для запиту 
 * @param {String} method  Тип запиту POST, GET та інші
 * @param {Object} data    Дані, що надсилаються
 * @return {Promise}
 */
const sendAxiosRequest = async (uri, method, data)=>{
    const agent =  new https.Agent({  
           rejectUnauthorized: false
    }) 
    const configuration = {
        method: method,
        url: uri,
        httpsAgent : agent,
        headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'},
        responseType: 'json'
    }
    if(data){
        configuration['data'] = data
    }
    return await axios(configuration)
}

/**
 * @param {String} instance Ідентифікатор ноди
 * @param {String} uri      URL  для запиту 
 * @param {Object} data     Дані, що надсилаються
 * @return {Promise}
 */
const holdWebservice = (instance, uri) => {
    try{
        let data = Nodes.getOrCreate(d => d.instance == instance, extend({}, {instance, uri}, { status: 200, updatedAt: new Date()}))
        if(data != undefined){
            data.uri = uri
            data.status = 200
            data.updatedAt = new Date()
            Nodes.save()
        }
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}

/**
 * @param {String} instance Ідентифікатор ноди
 * @return {Promise}
 */
const unholdWebservice = (instance) => {
    try{
        Nodes.remove(d => d.instance == instance)
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}


module.exports = {
    sendProxyRequest,
    holdWebservice,
    unholdWebservice
}