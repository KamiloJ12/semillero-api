
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, tieneRole } = require('../middlewares');
/*
const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
*/

const { getAdministradores,
        getAdministradorById, 
        createAdministrador,
        updateAdministrador,
        deleteAdministrador
    } = require('../controllers/administradores');

const router = Router();

router.get('/', [ 
    validarJWT,
    tieneRole('Superadministrador'), 
], getAdministradores );
router.get('/:id', [ 
    validarJWT,
    tieneRole('Superadministrador', 'Administrador')
], getAdministradorById );
router.post('/', [ 
    validarJWT,
    tieneRole('Superadministrador')
], createAdministrador );
router.put('/:id', [ validarJWT,
    tieneRole('Superadministrador', 'Administrador')
], updateAdministrador );
router.put('/:id/desactivate', [ 
    validarJWT,
    tieneRole('Superadministrador')
], deleteAdministrador );
/* 
router.put('/:id',[
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ), 
    validarCampos
], usuariosPost );

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );
 */

module.exports = router;