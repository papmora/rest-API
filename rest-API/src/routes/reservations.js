const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const spaces = require('../memory/memorySpaces');
const reservations = require('../memory/memoryReservations');
const lib = require("./lib");

/**
 *@swagger
 * components:
 *  schemas:
 *      Reservation:
 *          type: objet
 *          required:
 *              -placa
 *          properties:
 *              spaceId:
 *                  type: string
 *                  description: id del espacio que esta ocupando
 *              placa:
 *                  type: string
 *                  description: numero de placa del vehiculo
 *              hour:
 *                  type:date
 *                  description:hora en la que se reservó el espacio del vehiculo  
 */

router.get('/', (req, res) => {
    res.json(reservations);
});

router.get('/reservation', lib.paginatedResults(reservations), (req, res) => {
    res.json(res.paginatedResults);
});

router.get('/placa/:placa', (req, res) => {
    const { placa } = req.params;
    placaArray=[];
    _.each(reservations, (reservation, i) => {
        if (reservation.placa === placa) {
            placaArray.push(reservation);
        }
        
    });
    res.json(placaArray);  
});

router.post('/', (req, res) => {
    let date = new Date();
    _.each(spaces, (space, i) => {
        if (space.estado === 'free') {
            let spaceId=space.id;
            let hour= date.getHours();
            const {placa} = req.body;
            const newReservation = { ...req.body,spaceId,hour };
            if (placa) {
                space.estado = 'taken';
                reservations.push(newReservation);
                res.json(reservations);
            } else {
                res.status(405).json({error: 'Ocurrio un error al intentar registrar una nueva reservacion, no indico la placa'});
            }
        }
        
    });
    res.status(405).json({error: 'Ocurrio un error al intentar registrar una nueva reservacion, no hay espacios vacios'});

    
    
    
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(reservations, (reservation, i) => {
            if (reservation.spaceId == id) {
                reservations.splice(i, 1);
            }
        });
        res.json(reservations);
    }
    else{
        res.status(405).json({error: 'Ocurrio un error al intentar eliminar una reservacion'});

    }
});

module.exports = router;