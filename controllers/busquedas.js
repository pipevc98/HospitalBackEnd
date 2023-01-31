const { response } = require("express");

const Usuario = require('../MODELS/usuario');
const Medico = require('../MODELS/medico');
const Hospital = require('../MODELS/hospital');





const getTodoColeccion = async (req , res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch ( tabla ) {
        case 'medicos':

            data = await Medico.find({ nombre: regex }); 
            
            break;

        case 'hospitales':

            data = await Hospital.find({ nombre: regex })
            
            break;
    
        case 'usuarios':
            
           data = await Usuario.find({ nombre: regex });
           
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser medicos,hospitales o usuarios'
            });
    }


    res.json({
        ok: true,
        resultado: data
       });
}


const getTodo = async (req , res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}


module.exports = {
    getTodo,
    getTodoColeccion
}