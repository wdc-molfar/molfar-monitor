module.exports = {
	service:{
		mode: process.env.NODE_ENV || "development",
		port: process.env.PORT || 3002,
		host: process.env.HOST || "localhost",
		usePort: process.env.USE_PORT || false,
		deploymentDir: "./.deployment"
	}
}
