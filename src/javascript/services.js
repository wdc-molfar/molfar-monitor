const { Nodes } = require("./util/db.js")
const { extend }  = require("lodash")
const axios     = require("axios")
const https     = require("https")

//
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

const handlerAxiosRequest = async(url, method, data) => {
    return await sendAxiosRequest(url, method, data)
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


const holdWebservice = (instance, uri) => {
    try{
        Nodes.getOrCreate(d => d.url == uri, extend({}, {instance, uri}, { status: 200, updatedAt: new Date()}))
    } catch (e) {
    	throw new Error(`@Molfar Monitor Error: ${e.toString()}`)
    }
}


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