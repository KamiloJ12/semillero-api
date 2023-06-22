
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares');

const { getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto } = require('../controllers/proyectos');

const router = Router();

router.get('/', getProyectos );
router.post('/', [ validarJWT ], createProyecto );
router.get('/:id', getProyectoById );
router.put('/:id', [ validarJWT ], updateProyecto );
router.put('/:id/desactivate', [ validarJWT ], deleteProyecto );


module.exports = router;