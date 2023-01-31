// api/upload/usuarios/:id

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, getFoto } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', getFoto);


module.exports = router;