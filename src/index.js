/**Autores: Alex Marin, Pablo Mora */

/** Se importan las dependencias que seran usadas */
const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');



/** Se hace uso de CORS para que la aplicacion en React pueda acceder 
 * a las solicitudes del API */
app.use(cors({
    origin: 'localhost:3001' 
}));


/** configuracion de puertos, como defecto se pone el puerto 3000*/ 
app.set('port', process.env.PORT || 3000);

/** uso de las dependencias, morgan para ver en terminal lo que se recibe
 * express.json para la lectura de los mime type del tipo json
 */
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/** Se hace referencia a las rutas creadas dentro de la carpeta routes */
app.use('/api/spaces', require('./routes/spaces'));
app.use('/api/reservations', require('./routes/reservations'));

/** Se inicia el servidor en el puerto determinado o bien el 3000 por defecto */
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
    
});