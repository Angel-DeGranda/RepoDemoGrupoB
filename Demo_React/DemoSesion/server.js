// npm i express cors cookie-parser jsonwebtoken

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import auth from "./auth.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  //vite lo pone es ese
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const SECRET = "super_secreto"; //esto no debe de ir aqui, debe de ir en el .env

app.post("/login", (req, res) => {
    console.log("haciendo login");
    const { username, password } = req.body;

    if(username === "admin" && password === "1234"){
        const token = jwt.sign({username}, SECRET, {expiresIn: "1h"});
        res.cookie("token", token, {
            httpOnly: true, //no se puede leer con JS
            secure: false, // true si usas https
            sameSite: "strict",
            maxAge: 3600000
        });

        return res.json({mensaje: "Login exitoso"});
    }

    return res.status(401).json({mensaje: "credenciales invalidas"});
});

app.post("/logout", (req, res) => {
    console.log("haciendo logout");
    res.clearCookie("token");
    res.json({mensaje: "Logout exitoso, bye!"})
});

app.get("/perfil", auth, (req, res) => {//auth es un helper
    console.log("haciendo perfil");
    res.json({
        mensaje: "Sección protegida",
        user: req.username
    });
}); 

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});