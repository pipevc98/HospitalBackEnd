/// Ruta: /api/hospitales

const {Router} = require('express');
//Validar 
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

const {crearHospitales,
    getHospitales,
    ActualizarHospitales,
    borrarHospitales} = require('../controllers/hospitales')


router.get('/',getHospitales );


router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    crearHospitales
);


router.put('/:id', [], ActualizarHospitales);

 router.delete('/:id',  borrarHospitales);


 module.exports = router;












