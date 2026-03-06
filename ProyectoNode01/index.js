const express = require("express");
const app = express();
const port = 4100; //0 - 1024 son puertos reservados
app.use(express.json());

let pokemones = [
    {id:1, name:"charmander", type:"Fire"},
    {id:2, name:"squitle", type:"water"},
    {id:3, name:"sylveon", type:"Flairy"},
];

app.get("/",(req, res) =>{
    
    return res.send("Hola mundo desde Node backend");
});

//route pokemon
app.get("/pokemones", (req, res) =>{
    return res.json(pokemones);
});

app.get("/pokemones/3", (req, res) =>{
    return res.json(pokemones[2]);
});

app.post("/alta-pokemon", (req, res) => {
    let nuevo_pokemon = {
        id:pokemones.length+1,
        name:req.body.name,
        type:req.body.type,
    };
    pokemones.push(nuevo_pokemon);
    return res.status(200).json(pokemones);
});

app.listen(port,() =>{
    console.log("Servidor ejecutandoseen localhost"+port);
});