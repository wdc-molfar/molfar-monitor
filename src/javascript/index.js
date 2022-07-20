
const YAML = require('yamljs');


const bodyParser = require('body-parser')
const express = require('express')
const CORS = require("cors")
const swaggerUi = require('swagger-ui-express');
const swStats = require('swagger-stats');



const config  = require("./util/yaml-config.js")("./config.yml")
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


swaggerDocument.servers[0].url = process.env.HOST || config.service.host;
swaggerDocument.servers[0].description = "";


app.use(swStats.getMiddleware({swaggerSpec:swaggerDocument, uriPath:"/metrics", name:"@molfar/molfar-monitor"}))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


let routes = require("./routes")

routes.forEach( route => {
	// console.log(route)
	app[route.method](route.path, route.handler)
})
// console.log(container().state)

app.get("/", (req,res) => {
    res.writeHead(200, { 'Content-Type':'text/html'});
	res.end(JSON.stringify({service: "MOLFAR-MONITOR"}))
})




// node self-registration section ref to ./src/javascript/container


module.exports = app