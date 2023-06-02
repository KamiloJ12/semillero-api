const { Administrador, Miembro } = require('../models');

const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = existeEmail = await Miembro.findOne({ where: { correo } });;       
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
    existeEmail = await Administrador.findOne({ where: { correo } });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeMiembroPorId = async( id ) => {
    
    // Verificar si el correo existe
    const existeUsuario = await Miembro.findByPk(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeAdministradorPorId = async( id ) => {
    
    // Verificar si el correo existe
    const existeUsuario = await Administrador.findByPk(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    emailExiste,
    existeAdministradorPorId,
    existeMiembroPorId,
    coleccionesPermitidas
}
