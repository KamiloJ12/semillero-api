const path = require('path');
const fs   = require('fs');

const { response } = require('express');

const mostrarImagen = async(req, res = response ) => {
    try{
        const { coleccion, nombre } = req.params;
            // Hay que borrar la imagen del servidor
        
        if(nombre && coleccion){
            const pathImagen = path.join( __dirname, '../uploads', coleccion, nombre );
            if ( fs.existsSync( pathImagen ) ) {
                return res.sendFile( pathImagen )
            }
        }
    
        const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile( pathImagen );

    } catch (error) {
        const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile( pathImagen );
    }
}

module.exports = {
    mostrarImagen
}