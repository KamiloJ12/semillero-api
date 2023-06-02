const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { Administrador } = require('../models');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.headers.authorization;
    
    if ( !token ) {
        return res.status(401).json({
            code: 401,
            message: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el administrador que corresponde al uid
        const administrador = await Administrador.findByPk( uid );

        if( !administrador ) {
            return res.status(401).json({
                code: 401,
                message: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !administrador.estado ) {
            return res.status(401).json({
                code: 401,
                message: 'Token no válido - usuario con estado: false'
            })
        }
             
        req.usuario = administrador;
        next();

    } catch (error) {
        res.status(401).json({
            code: 401,
            message: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}