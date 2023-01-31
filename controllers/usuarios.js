const Usuario = require('../MODELS/usuario');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/jws');


//Metodo para obtener los usuarios


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    console.log(desde);


    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google')
            .skip( desde )
            .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok:true,
        usuarios,
        total
    });
}

//metodo para crear el usuario

const crearUsuarios = async (req, res = response) => {

    const {nombre, email, password} = req.body;

    
    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already exist'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        await usuario.save();
        //Generar el token JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok:true,
            usuario,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

}


const actualizarUsuario = async (req, res = response) => {
    //TODO: Validar token  y comprobar si es el usuario correcto

    const uid = req.params.id;
    const {} = req.body

    try {
        ///////////VERIFICAR SI EL USUARIO EXISTE//////////////////
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB) {
            res.json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        /////////////////////////////////////////////////////////////////

        //Actualizaciones
        const {email, password, ...campos} = req.body;

        
        if(usuarioDB.email === req.body.email){

            delete campos.email;

        } else {

            const existeEmail = await Usuario.findOne({email: req.body.email});

            if (existeEmail) {
                return res.json({
                    ok: false,
                    msg:'Ya existe un usuario con ese email'
                })
            }

        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }

}


const deleteUsers = async(req,res = response) => {
    const uid = req.params.id;
    try {

        // Verificar si existe el usuario con el id
        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB) {
            res.json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        /////////////////////////////////////////////

        await Usuario.findByIdAndRemove( uid );


        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    deleteUsers
}