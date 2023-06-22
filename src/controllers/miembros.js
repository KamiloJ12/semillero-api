const { response, request } = require('express');

const { Miembro, Proyecto } = require('../models');
const { subirArchivo, actualizarArchivo } = require('../helpers');

const getMiembros = async(req = request, res = response) => {
    try {
        const { limite = null, desde = 0 } = req.query;
        
        const [ total, miembros ] = await Promise.all([
            Miembro.count(),
            Miembro.findAll({
                offset: desde,
                limit: limite
            })
        ]); 

        res.json({ total, miembros });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const getMiembroById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const miembro = await Miembro.findOne({
            where: { id: id },
            include: { 
                model: Proyecto,
                as: 'proyectos' 
            } 
        });
        res.json(miembro);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const createMiembro = async(req, res = response) => {
    try{
        const { id, ...resto } = req.body;
        const imagen = await subirArchivo(req.files, undefined, 'miembro');
        const data = { ...resto, imagen, estado: 'Activo' };

        const miembro = await Miembro.create(data);
        res.json({ miembro });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const updateMiembro = async(req, res = response) => {
    try {
        const { id } = req.params;
        const { id: _id, ...resto } = req.body;

        if(req.files){
            resto.imagen = await actualizarArchivo(req.files, resto.imagen, undefined, 'miembro');
        }

        const miembro = await Miembro.update(resto, {
            where: { id }
          });
        res.json(miembro);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const restoreMiembro = async(req, res = response) => {
    try {
        const { id } = req.params;
        const miembro = await Miembro.update({ estado: 'Activo'}, {
            where: { id }
          });
          res.json(miembro);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const deleteMiembro = async(req, res = response) => {
    try {
        const { id } = req.params;
        const miembro = await Miembro.update({ estado: 'Inactivo'}, {
            where: { id }
          });
          res.json(miembro);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    getMiembros,
    getMiembroById,
    createMiembro,
    updateMiembro,
    restoreMiembro,
    deleteMiembro
}