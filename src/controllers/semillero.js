const { Semillero } = require('../models');

const getSemillero = async(req = request, res = response) => {
    try {
        const semillero = await Semillero.findOne({
            where: { id: 1 }, 
        });
        res.json(semillero);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const updateSemillero = async(req = request, res = response) => {
    try {
        const { id, ...resto } = req.body;
        const semillero = await Semillero.update(resto, {
            where: { id: 1 }, 
        });
        res.json(semillero);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    getSemillero,
    updateSemillero
}