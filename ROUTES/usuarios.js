const {Router} = require('express');
//Validar 
const {check} = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuario, deleteUsers} = require('../controllers/usuarios')
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();


router.get('/', validarJWT ,getUsuarios );


router.post('/',
[
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    check('email', ' El email es obligatorio').isEmail(),    
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos    

],
crearUsuarios 

);


router.put('/:id',
[

    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', ' El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),   
    validarCampos 

],
 actualizarUsuario
 );

 router.delete('/:id', validarJWT, deleteUsers)

















module.exports = router;

