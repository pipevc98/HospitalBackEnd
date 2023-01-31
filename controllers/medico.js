const {response} = require('express');
const Medico = require('../MODELS/medico');

const getMedicos = async (req, res = response) => {

    const medicos  = await Medico.find().populate('usuario', 'nombre')
                                        .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });

}

const crearMedicos = async (req, res = response) => {

    const uid =  req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        const medicoDB = await medico.save()
        
        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {

        console.log(error)
       res.status(500).json({
        ok: false,
        msg: 'Habla con el administrador'
       }) 
    }

    res.json({
        ok: true,
        msg: 'getMedicos'
    })
    
}



const ActualizarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getMedicos'
    })
    
}

const borrarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'getMedicos'
    })
    
}

module.exports = {
    crearMedicos,
    getMedicos,
    ActualizarMedicos,
    borrarMedicos
}