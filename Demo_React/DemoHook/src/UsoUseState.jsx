import { useState } from "react";
export default function Demo(){
    const [nombre, setNombre] = useState("Luis");
    const cambio = () => {
        if(nombre ==="Luis"){
            setNombre("Arturo")
        }
        else{
            setNombre("Luis")
        }
    }
    const cambioAlternario = ()=>{
        nombre === "Luis" ? setNombre("Arturo"): setNombre("Luis");
    }
    return(
        <div>
            <h2>{nombre}</h2>
            <button onClick={cambioAlternario}>
                Click me
            </button>
        </div>
    );
}
