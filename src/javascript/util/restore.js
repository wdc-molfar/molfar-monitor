const container = require("./container")
const {
	startMicroservice,
	holdMicroservice
} = require("../services")



module.exports = async () => {

	console.log("@MOLFAR Node: restore state...\n")
	for( let i=0; i < container().state.microservices.length; i++){
		let ms = container().state.microservices[i]
		console.log(`Hold microservice ${ms.id} by path ${ms.deployment.servicePath}`)
		holdMicroservice(ms.deployment.servicePath, ms.id)
		if(ms.start){
			console.log(`Start microservice ${ms.id}`)
			delete ms.start
			await startMicroservice(ms.id, ms.config)
		}	
	}
	console.log("\n@MOLFAR Node: ready to use")
	
} 
