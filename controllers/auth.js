const {response} = require('express');
const Usuario = require('../MODELS/usuario');


const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jws');

const login = async (req, res = response) => {

    const {email, password} = req.body
    
    try {

        //Verificar email

        const usuarioDb = await Usuario.findOne({email});

        if(!usuarioDb){
            return res.status(400).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        //Verificar contraseña

        const validPassword = bcrypt.compareSync( password, usuarioDb.password);
        if(!validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'contraseña no valida'
            })
        }

        //Generar el token JWT
        const token = await generarJWT(usuarioDb.id)

        res.json({
            ok:true,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Errero inesperado. Hable con el administrador'
        });

    }
}


module.exports = {
    login
}