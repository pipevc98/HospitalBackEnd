const {response, request} = require('express');

const Hospital = require('../MODELS/hospital');

const getHospitales = async (req, res = response) => {

    const hospitales  = await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospitales = async (req, res = response) => {

    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {
        
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
    
}



const ActualizarHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
    
}

const borrarHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
    
}

module.exports = {
    crearHospitales,
    getHospitales,
    ActualizarHospitales,
    borrarHospitales
}