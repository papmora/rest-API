const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const reservations = [];

router.get('/', (req, res) => {
    res.json(reservations);
});

router.post('/', (req, res) => {
    let date = new Date();
    _.each(spaces, (space, i) => {
        if (space.estado === 'free') {
            space.estado = 'taken';
            let spaceId=space.id;
            let hour= date.getHours();
            const {placa} = req.body;
            const newReservation = { ...req.body,spaceId,hour };
            if (placa) {
                reservations.push(newReservation);
                res.json(reservations);
            } else {
                res.status(405).json({error: 'Ocurrio un error al intentar registrar una nueva reservacion, no indico la placa'});
            }
        }
        else {
            res.status(405).json({error: 'Ocurrio un error al intentar registrar una nueva reservacion, no hay espacios vacios'});

        }
    });
    
    
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(reservations, (reservation, i) => {
            if (reservation.id == id) {
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