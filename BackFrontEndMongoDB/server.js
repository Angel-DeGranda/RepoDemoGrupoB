const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Usuario = require("./models/Usuario");

const app = express();
const port = 3600;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));                                                                                                                       

//Conexion con MongoDB
//mongodb+srv://jestudillo:jestudillo@cluster0.6m8fm.mongodb.net/?appName=Cluster0
// mongoose.connect("mongodb+srv://202360671:Sistemas25@cluster0.7dtlhqi.mongodb.net/?appName=Cluster0")
// .then(()=>console.log("MongoDB conectado al proyecto"))
// .catch(err => console.log(err));

mongoose.connect("mongodb://202360671:Sistemas25@ac-xlhafdh-shard-00-00.7dtlhqi.mongodb.net:27017,ac-xlhafdh-shard-00-01.7dtlhqi.mongodb.net:27017,ac-xlhafdh-shard-00-02.7dtlhqi.mongodb.net:27017/GrupoB?ssl=true&replicaSet=atlas-vwzl6p-shard-0&authSource=admin&appName=Cluster0")
.then(
    ()=>console.log("MongoDB database service listo")
    )
.catch(
    err => console.log(err)
);

app.get("/api/usuarios", async (req, res) =>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

app.post("/api/usuarios", async (req,res)=>{
    const nuevo = new Usuario(
        {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
        }
    );
    
    const guardado = await nuevo.save();
    res.json(guardado);
});

app.put("/api/usuarios/:id", async (req, res)=>{
    usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        { $set: {
            nombre: req.body.nombre,
            email: req.body.email,
            genero: req.body.genero,
            plataformas: req.body.plataformas
            }  
        },
        {new:true} //si no existe lo agrega.
    );
    
    res.json(usuarioActualizado);
});

app.listen(port, ()=>{
    console.log("Listening at http://localhost:3600");
})