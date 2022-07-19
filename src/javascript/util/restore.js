const container = require("./local-container")
const logger = require('./logger.js').logger


module.exports = async () => {

	logger.info("@MOLFAR Monitor: restore state...\n")

	for( let i = 0; i < container().state.webservices.length; i++){
		let ms = container().state.webservices[i]
		container().hold(ms.id, ms.uri)
	}
	logger.info("\n@MOLFAR Monitor: ready to use")
} 
