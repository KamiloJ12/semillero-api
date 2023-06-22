const { response, request } = require('express');

const { Diapositiva } = require('../models');
const { subirArchivo } = require('../helpers');

const createDiapositiva = async(req = request, res = response) => {
    try{
        const { id, link } = req.body;
        const imagen = await subirArchivo(req.files, undefined, 'diapositiva');
        const data = { imagen, link };

        const diapostiva = await Diapositiva.create(data);
        res.json({ diapostiva });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const getDiapositivas = async(req = request, res = response) => {
    try {
        const diapositivas = await Diapositiva.findAll(); 
        res.json(diapositivas);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const deleteDiapositiva = async(req = request, res = response) => {
    try{
        const { id } = req.params;
        const diapostiva = await Diapositiva.destroy({
            where: {
              id: id
            }
          });
        res.json({ diapostiva });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    createDiapositiva,
    deleteDiapositiva,
    getDiapositivas
};