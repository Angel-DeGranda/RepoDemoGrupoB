import jwt from "jsonwebtoken"; 

export default function auth(req, res, next){
    const SECRET = "super_secreto" //la misma clave secreta que debería estan en el .env
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({mensaje: "No autenticado"});
    }

    try{
        const decode = jwt.verify(token, SECRET);
        req.username = decode.username;
        next();
    }catch(error){
        console.log("Error en JWT", error.message);
        return res.status(401).json({mensaje: "¡Token no válido!"})
    }
}