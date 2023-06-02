const { response } = require('express')


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                code: 500,
                message: 'Se quiere verificar el role sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                code: 401,
                message: `El servicio requiere uno de estos roles ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    tieneRole
}