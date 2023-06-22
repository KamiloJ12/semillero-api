const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:            '/api/auth',
            buscar:          '/api/buscar',
            eventos:         '/api/eventos',
            proyectos:       '/api/proyectos',
            administradores: '/api/administradores',
            miembros:        '/api/miembros',
            uploads:         '/api/uploads',
            semillero:       '/api/semillero',
            diapositivas:    '/api/diapositivas'
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use( this.paths.auth, require('./routes/auth.routes'));
        this.app.use( this.paths.administradores, require('./routes/administradores.routes'));
        //this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.eventos, require('./routes/eventos.routes'));
        this.app.use( this.paths.diapositivas, require('./routes/diapositivas.routes'));
        this.app.use( this.paths.semillero, require('./routes/semillero.routes'));
        this.app.use( this.paths.proyectos, require('./routes/proyectos.routes'));
        this.app.use( this.paths.miembros, require('./routes/miembros.routes'));
        this.app.use( this.paths.uploads, require('./routes/uploads.routes'));        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;