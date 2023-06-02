const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { Administrador } = require('../models');
const { subirArchivo } = require('../helpers');

const getAdministradores = async(req = request, res = response) => {
    try {
        const { limite = null, desde = 0 } = req.query;
        const query = { estado: 'Activo' };
        
        const [ total, administradores ] = await Promise.all([
            Administrador.count({ where: query}),
            Administrador.findAll({
                where: query,
                offset: Number(desde),
                limit: Number(limite)
            })
        ]); 

        res.json({ total, administradores });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const getAdministradorById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const administrador = await Administrador.findByPk(id);

        res.json( administrador );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const createAdministrador = async(req, res = response) => {
    try{
        
        const imagen = await subirArchivo(req.files, undefined, 'administrador');
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync( req.body.identificacion, salt );

        const data = { ...req.body, imagen, password, estado: 'Activo' };

        const administrador = await Administrador.create(data);
        res.json({ administrador });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const updateAdministrador = async(req, res = response) => {

    try {
        const { id } = req.params;
        const { id: _id, password, correo, ...resto } = req.body;

        const administrador_bd = await Administrador.findByPk(id);
        if(password != administrador_bd.password){
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }
        const administrador = await Administrador.update(resto, {
            where: { id }
          });
        res.json(administrador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const deleteAdministrador = async(req, res = response) => {
    try {
        const { id } = req.params;
        const administrador = await Administrador.update({ estado: 'Inactivo'}, {
            where: { id }
          });
          res.json(administrador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    getAdministradores,
    getAdministradorById,
    createAdministrador,
    updateAdministrador,
    deleteAdministrador
}