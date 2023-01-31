/*
    Path: '/api/login'
*/
const {Router} = require('express');
const { check } = require('express-validator');
const {login} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos')



const router = Router();


router.post('/',
[
    check('email', 'El email es obligatiorio').isEmail(),
    check('password', 'El pasword es obligatorio').not().isEmpty(),
    validarCampos
],
login
);













module.exports = router