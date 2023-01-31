

// api/todo/:busqueda

const {Router} = require('express');
const { getTodo,getTodoColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();




router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getTodoColeccion);





module.exports = router;