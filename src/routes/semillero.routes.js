
const { Router } = require('express');
const { validarJWT, tieneRole } = require('../middlewares');


const { 
    getSemillero,
    updateSemillero
} = require('../controllers/semillero');

const router = Router();

router.get('/', getSemillero );
router.put('/', [ validarJWT,
    tieneRole('Superadministrador')
], updateSemillero );

module.exports = router;