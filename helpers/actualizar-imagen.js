const fs = require('fs');

const Usuario = require('../MODELS/usuario');
const Medico = require('../MODELS/medico');
const Hospital = require('../MODELS/hospital');


const borrarImg = (path) => {
    if(fs.existsSync( path ) ){
        //borrar imagen anterior
        fs.unlinkSync( path );
    }
}



const actualizarImg = async (tipo, id, nombreArchivo) =>{

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            
                const medico = await Medico.findById(id);
                if(!medico){
                    console.log('El id del medico no existe');
                    return false;
                }

                //path de la imagen
                pathViejo = `./uploads/medicos/${medico.img}`;

                //metodo para borrar la imagen
                borrarImg(pathViejo);

                //guardar la nueva imagen
                medico.img = nombreArchivo;
                await medico.save();

                return true;

        break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('El id del hospital no existe');
                return false;
            }

            //path de la imagen
            pathViejo = `./uploads/hospitales/${hospital.img}`;

            //metodo para borrar la imagen
            borrarImg(pathViejo);

            //guardar la nueva imagen
            hospital.img = nombreArchivo;
            await hospital.save();

            return true;
            
            break;

        case 'usuarios':

                const usuario = await Usuario.findById(id);
                if(!usuario){
                    console.log('El id del usuario no existe');
                    return false;
                }

                //path de la imagen
                pathViejo = `./uploads/usuarios/${usuario.img}`;

                 //metodo para borrar la imagen
                borrarImg(pathViejo);

                //guardar la nueva imagen
                usuario.img = nombreArchivo;
                await usuario.save();

                return true;
            
            break;
    
        default:

            break;
    }

}

module.exports = {
    actualizarImg
}