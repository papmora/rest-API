/**Autores: Alex Marin, Pablo Mora */

/** Se importan las dependencias que seran usadas */
const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI= require("swagger-ui-express");
const swaggerJsDocs = require ("swagger-jsdoc");
const https = require ("https");
const fs = require("fs");
const path = require ("path");



/** configuracion y opciones para swagger */
const options ={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "api-rest",
            version: "1.0.0",
            description : "Taller SOA, rest-api"
        },
        servers:[
            {url:"https://localhost:3200",
        },
        ],
    },
    apis:["src/routes/*.js"],
};

const specs = swaggerJsDocs(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))



/** Se hace uso de CORS para que la aplicacion en React pueda acceder 
 * a las solicitudes del API */
app.use(cors({
    origin: '*' 
}));



/** uso de las dependencias, morgan para ver en terminal lo que se recibe
 * express.json para la lectura de los mime type del tipo json
 */
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/** Se hace referencia a las rutas creadas dentro de la carpeta routes */
app.use('/api/spaces', require('./routes/spaces'));
app.use('/api/reservations', require('./routes/reservations'));


const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname,"cert", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname,"cert", "cert.pem"))
    },
    app
)

sslServer.listen(3200, ()=> console.log("Servidor seguro en puerto 3200"))