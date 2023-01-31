const path = require('path');
const fs = require('fs')

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImg } = require("../helpers/actualizar-imagen");




const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    //Validar tipo
    if(!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un usuario, medico u hospital'
        });
    }

        
    //Validar si existe una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no files were uploaded'
        });
      }


    //procesar la imagen

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado [nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    

    if( !extensionesValidas.includes( extensionArchivo ) ){
        return res.status(400).json({
            ok: false,
            msg: 'no es una extension permitida'
        });
    }


    //Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;


    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;
    
    //mover la imagen
    file.mv(path, (err) => {
        if (err){

            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
    
        res.json({
            ok: true,
            msg: 'archivo subido',
            nombreArchivo
        });

      });


    //Actualizar la imagen que viene del helper/actualizar-img
    actualizarImg(tipo, id, nombreArchivo);

}

const getFoto = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //Saber si existe o no la imagen
    if( fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }


}


module.exports = {
    fileUpload,
    getFoto
}