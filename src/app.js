const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require("./routes/index.js");
const morgan = require("morgan");
const path = require("path");

const server = express();
server.name = "API";

require("./db.js");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
	definition: {
 		openapi: "3.1.0",
 		info: {
 			title: "Node.js - Express API",
 			version: "1.0.0",
 		},
 		servers: [
 			{
 				url: "https://estoeschallengeback-production.up.railway.app",
 			},
 		],
 	},
 	apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(
 	"/api-doc",
 	swaggerUI.serve,
 	swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
	res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use("/api", routes);

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;