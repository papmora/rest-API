const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const spaces = require('../memory/memorySpaces');



router.get('/', (req, res) => {
    res.json(spaces);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    _.each(spaces, (space, i) => {
        if (space.id === id) {
            res.json(space)
        }
    });
    res.status(405).json({error: 'Ocurrio un error, el id ingresado no se encuentra registrado'});   

});

router.post('/', (req, res) => {
    const id = spaces.length + 1;
    const {estado} = req.body;
    const newSpace = { ...req.body, id };
    if (estado) {
        spaces.push(newSpace);
        res.json(spaces);
    } else {
        res.status(405).json({error: 'Ocurrio un error al intentar registrar un nuevo espacio'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    if (estado) {
        _.each(spaces, (space, i) => {
            if (space.id === id) {
                space.estado = estado;
            }
        });
        res.json(spaces);
    } else {
        res.status(405).json({error: 'Ocurrio un error al intentar editar un nuevo espacio'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(spaces, (space, i) => {
            if (space.id == id) {
                spaces.splice(i, 1);
            }
        });
        res.json(spaces);
    }
    else {
        res.status(405).json({error: 'Ocurrio un error al intentar eliminar un nuevo espacio'});
    }
});
 
module.exports = router;

