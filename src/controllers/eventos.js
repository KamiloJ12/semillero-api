const { response, request } = require('express');

const { Evento, Administrador } = require('../models');
const { subirArchivo, actualizarArchivo } = require('../helpers');

const getEventos = async(req = request, res = response) => {
    try {
        const { limite = null, desde = 0 } = req.query;
        
        const [ total, eventos ] = await Promise.all([
            Evento.count(),
            Evento.findAll({
                include: [
                    {
                      model: Administrador,
                      as: 'divulgador'
                    },
                ],
                offset: desde,
                limit: limite
            })
        ]); 

        res.json({ total, eventos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const getEventoById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByPk(id);
        res.json(evento);
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const createEvento = async(req, res = response) => {
    try{
        const { id, ...resto } = req.body;
        const imagen = await subirArchivo(req.files, undefined, 'evento');
        const data = { ...resto, imagen, divulgador_id: req.usuario.id, estado: 'Activo' };

        const evento = await Evento.create(data);
        res.json({ evento });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const updateEvento = async(req, res = response) => {
    try {
        const { id } = req.params;
        const { id: _id, ...resto } = req.body;

        if(req.files){
            resto.imagen = await actualizarArchivo(req.files, resto.imagen, undefined, 'evento');
        }

        const evento = await Evento.update(resto, {
            where: { id }
          });
        res.json(evento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const deleteEvento = async(req, res = response) => {
    try {
        const { id } = req.params;
        const evento = await Evento.update({ estado: 'Inactivo'}, {
            where: { id }
          });
          res.json(evento);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    getEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento
}