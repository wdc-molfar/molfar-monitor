
/*
	Simple db with Metrics and Nodes collections as singleton
*/

/*
	@See: https://www.npmjs.com/package/simpl.db
*/


const SimplDB = require('simpl.db') 
  
const db = new SimplDB()

const Metrics = db.createCollection('metrics')
const Nodes = db.createCollection('nodes')

module.exports = {
	Metrics,
	Nodes
}
