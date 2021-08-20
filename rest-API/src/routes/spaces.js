const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const spaces = require('../memory/memorySpaces');
const lib = require("./lib");


/**
 *@swagger
 * components:
 *  schemas:
 *     Space:
 *          type: objet
 *          required:
 *              -estado
 *          properties:
 *              id:
 *                  type: string
 *                  description: id auto generado
 *              estado:
 *                  type: string
 *                  description: estado del espacio, free= disponible, taken= ocupado. 
 */

 /**
  * @swagger
  * tags:
  *   name: Space
  *   description: El manejo de espacios del API
  */

/**
 * @swagger
 * /api/spaces/:
 *   get:
 *     summary: Retorna los espacios del API
 *     tags: [Spaces]
 *     responses:
 *       200:
 *         description: Espacios del API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Space'
 */

 router.get('/', (req, res) => {
    res.json(spaces);
});

router.get('/space', lib.paginatedResults(spaces), (req, res) => {
    res.json(res.paginatedResults);
});


/**
 * @swagger
 * /api/spaces/{id}:
 *   get:
 *     summary: Devuelve el espacio segun el Id
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: espacio segun Id
 *     responses:
 *       200:
 *         description: devuelve el espacio segun el Id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       405:
 *         description: Espacio no encontrado
 */

router.get('/:id', (req, res) => {
    const { id } = req.params;
    _.each(spaces, (space, i) => {
        if (space.id === id) {
            res.json(space)
        }
    });
    res.status(405).json({error: 'Ocurrio un error, el id ingresado no se encuentra registrado'});   

});


/**
 * @swagger
 * /api/spaces/estado/{estado}:
 *   get:
 *     summary: Devuelve los espacios segun su estado
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: estado
 *         schema:
 *           type: string
 *         required: true
 *         description: espacios segun estado
 *     responses:
 *       200:
 *         description: devuelve espacios segun el estado
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       405:
 *         description: Espacio no encontrado
 */
router.get('/estado/:estado', (req, res) => {
    const { estado } = req.params;
    estadoArray=[];
    _.each(spaces, (space, i) => {
        if (space.estado === estado) {
            estadoArray.push(space);
        }
        
    });
    res.json(estadoArray);   

});

/**
 * @swagger
 * /api/spaces/:
 *   post:
 *     summary: Crea nuevo espacio
 *     tags: [Spaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Space'
 *     responses:
 *       200:
 *         description: Espacio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Space'
 *       405:
 *         description: Error al crear espacio
 */

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


/**
 * @swagger
 * /api/spaces/{id}:
 *  put:
 *    summary: Actualiza estado del espacio
 *    tags: [Spaces]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id del espacio
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Space'
 *    responses:
 *      200:
 *        description: el estado se actualizo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Space'
 *      405:
 *        description: Error al actualizar espacio
 */

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

/**
 * @swagger
 * /api/spaces/{id}:
 *   delete:
 *     summary: Elimina espacio 
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id del espacio 
 * 
 *     responses:
 *       200:
 *         description: Espacio eliminado
 *       404:
 *         description: Error al eliminar espacio
 */

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

