
const { Router } = require('express');
const { check } = require('express-validator');

const { getMiembros,
    getMiembroById, 
    createMiembro,
    updateMiembro,
    deleteMiembro,
    restoreMiembro
} = require('../controllers/miembros');

const router = Router();

router.get('/', getMiembros );
router.get('/:id', getMiembroById  );
router.post('/', createMiembro );
router.put('/:id', updateMiembro );
router.put('/:id/desactivate', deleteMiembro );
router.put('/:id/activate', restoreMiembro );

module.exports = router;