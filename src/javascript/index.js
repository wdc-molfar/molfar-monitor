const bodyParser = require('body-parser')
const express = require('express')
const CORS = require("cors")
const swaggerUi = require('swagger-ui-express');
const config  = require('../../config')
const YAML = require('yamljs');
const swStats = require('swagger-stats');
const swaggerDocument = YAML.load('./oas.yaml')

const app = express();

app.use(CORS({
    origin: '*'
}))

app.use(bodyParser.text());

app.use(bodyParser.json({
    limit: '50mb'
}))

app.use(bodyParser.urlencoded({
        parameterLimit: 100000,
        limit: '50mb',
        extended: true
    }));

const container = require("./util/container")


swaggerDocument.servers[0].url = process.env.HOST || config.service.host;
swaggerDocument.servers[0].description = "";


app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument, uriPath:"/metrics", name:"@molfar/molfar-node"}))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


let routes = require("./routes")

routes.forEach( route => {
	// console.log(route)
	app[route.method](route.path, route.handler)
})
// console.log(container().state)

app.get("/", (req,res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
	res.end(JSON.stringify({service: "MOLFAR-NODE"}))
})




// node self-registration section ref to ./src/javascript/container


module.exports = app