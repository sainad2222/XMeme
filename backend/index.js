require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const swaggerApp = express();
const swaggerJsDoc = require("swagger-jsdoc"); // To convert comments to docs
const swaggerUi = require("swagger-ui-express"); // To host swagger at an endpoint

// swagger configuration options
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "XMeme",
			version: "1.0.0",
			description: "swagger docs for XMeme backend",
		},
		servers: [
			{
				url: "http://localhost:8081",
			},
		],
	},
	apis: ["./routes.js"],
};
// main swagger configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerApp.use(
	"/swagger-ui",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocs, { explorer: true })
);

// db connection
mongo_password = process.env.MONGO_PASS;
database = process.env.DB_NAME;
const uri = process.env.DATABASE;
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log(`[INFO] DATABASE CONNECTED`);
	})
	.catch((e) => {
		console.log(`[ERROR] ${e}`);
	});

// middlewares
app.use(bodyParser.json()); // for parsing and stuff. to access req.body for example
app.use(cors()); // to prevent cors errors

// routes
app.use("/", routes);

// MAIN server setup
const port = process.env.PORT || 3000;
app.listen(port, () =>
	console.log(`[INFO] listening on port http://localhost:${port}`)
);

// SWAGGER server setup
const swaggerPort = 8080;
swaggerApp.listen(swaggerPort, () => {
	console.log(
		`[INFO] SWAGGER listening on port http://localhost:${swaggerPort}`
	);
});
