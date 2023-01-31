const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el token leyendo los headers
    const token = req.header('x-token');
    console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la petición'
        })
    }

    //Verificar el token

    try {

        const {uid} = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }



    next()
}


module.exports = {
    validarJWT
}