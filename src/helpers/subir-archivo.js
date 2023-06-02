const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemp );
        });
    });

}

const actualizarArchivo = ( files, file, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }
        
        const pathImagen = path.join( __dirname, '../uploads', carpeta, file );
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve( nombreTemp );
        });
    });

}


module.exports = {
    subirArchivo,
    actualizarArchivo
}