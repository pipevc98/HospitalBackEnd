/// Ruta: /api/hospitales

const {Router} = require('express');
//Validar 
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const {getMedicos,ActualizarMedicos,borrarMedicos,crearMedicos} = require('../controllers/medico')


router.get('/',getMedicos );


router.post('/', 
[
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(), 
    check('hospital', 'el id del hospital no es valido').isMongoId(), 
    validarCampos
], crearMedicos 
);


router.put('/:id', [], ActualizarMedicos
 );

 router.delete('/:id',  borrarMedicos);

 module.exports = router;








