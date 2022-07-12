const {
    AmqpManager,
    Middlewares
} = require("@molfar/service-chassis")



const MetricsListener = class {
	constructor (config) {
		this.$config = config
	}

	onMetrics(callback){
		this.callback = callback
		return this
	}

	async start(){
		this.metrics = await AmqpManager.createConsumer(this.$config.metrics)
        await this.metrics.use([
            Middlewares.Json.parse,
            Middlewares.Error.Log,
            Middlewares.Error.BreakChain,
            (err, msg, next) => {
                try {
                    let m = msg.content
                    if(this.callback) this.callback(m)
                    msg.ack()
                }    
                catch(e){
                    console.log("ERROR", e)
                }    
            }
        ])
		await this.metrics.start()
	}

	async stop(){
		await this.metrics.close()
	}

}

module.exports =  config =>  (new MetricsListener(config))



