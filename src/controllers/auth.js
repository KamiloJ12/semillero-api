const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { Administrador } = require('../models');
const { generarJWT } = require('../helpers');

const login = async(req, res = response) => {
    try {
        const { correo, password } = req.body;
        // Verificar si el email existe
        const usuario = await Administrador.findOne({ where: {correo} });
        if ( !usuario ) {
            return res.status(400).json({
                code: 400,
                message: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                code: 400,
                message: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                code: 400,
                message: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({ usuario, token });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Ocurrio un error en el servidor'
        });
    }   

}

const verifyToken = async (req, res, next) => {
    return res.status(200).json({ usuario: req.usuario, token: req.headers.authorization });
}


module.exports = {
    login,
    verifyToken
}