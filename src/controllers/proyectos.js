const { response, request } = require('express');

const { Proyecto, MiembroProyecto } = require('../models');

const getProyectos = async(req = request, res = response) => {
    try {
        const { limite = null, desde = 0 } = req.query;
        
        const [ total, proyectos ] = await Promise.all([
            Proyecto.count(),
            Proyecto.findAll({
                offset: desde,
                limit: limite,
                include: 'divulgador'
            })
        ]); 

        res.json({ total, proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const getProyectoById = async(req = request, res = response) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.findOne({
            where: { id: id },
            include: 'equipo' 
        });
        console.log(proyecto);
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const createProyecto = async(req, res = response) => {
    try{ 
        const data = { ...req.body, divulgador_id: req.usuario.id, estado: 'Activo' };
        const proyecto = await Proyecto.create(data);

        for( miembro of data.equipo) {
            await MiembroProyecto.create({
                proyecto_id: proyecto.id,
                miembro_id: miembro.id
            });
        }

        res.json({ proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const updateProyecto = async(req, res = response) => {

    try {
        const { id } = req.params;
        const { id: _id, ...resto } = req.body;

        await Proyecto.update(resto, {
            where: { id }
          });
         
        await MiembroProyecto.destroy({
            where: { proyecto_id: id }
          });  

        await MiembroProyecto.bulkCreate(
            resto.equipo.map(miembro => ({
              proyecto_id: id,
              miembro_id: miembro.id
            }))
          );

        const proyecto = await Proyecto.findOne({
            where: { id: id },
            include: 'equipo' 
        });
          
        res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const deleteProyecto = async(req, res = response) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.update({ estado: 'Inactivo'}, {
            where: { id }
          });
          res.json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

module.exports = {
    getProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto
}