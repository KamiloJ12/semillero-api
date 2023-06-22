
const { Router } = require('express');
const { validarJWT } = require('../middlewares');

const { 
    createDiapositiva,
    deleteDiapositiva,
    getDiapositivas
} = require('../controllers/diapositivas');

const router = Router();

router.get('/', getDiapositivas );
router.post('/', [ validarJWT ], createDiapositiva );
router.delete('/:id', [ validarJWT ], deleteDiapositiva );

module.exports = router;