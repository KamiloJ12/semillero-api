const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { mostrarImagen } = require('../controllers/uploads');


const router = Router();

router.get('/:coleccion/:nombre',[
    check('coleccion', 'El nombre de la coleccion es obligatoria').not().isEmpty(),
    check('nombre', 'El nombre del archivo es obligatorio').not().isEmpty(),
    validarCampos
],mostrarImagen );

module.exports = router;