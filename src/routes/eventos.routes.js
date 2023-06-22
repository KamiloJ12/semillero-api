
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares');
const { getEventos, getEventoById, createEvento, updateEvento, deleteEvento } = require('../controllers/eventos');

const router = Router();

router.get('/', getEventos );
router.get('/:id', getEventoById );
router.post('/', [ validarJWT ], createEvento );
router.put('/:id', [ validarJWT ], updateEvento );
router.put('/:id/desactivate', [ validarJWT ], deleteEvento );


module.exports = router;