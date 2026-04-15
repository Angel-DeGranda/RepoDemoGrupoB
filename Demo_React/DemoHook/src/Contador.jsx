import { useState } from "react";
export default function Contador(){
    const [num, setNumero] = useState(0);

    const inc = () => {
        setNumero(num+1);
    }

    const dec = () => {
        setNumero(num-1);
    }

    return(
        <div>
            <p>{num}</p>

            <button onClick={inc}>Incrementar</button>
            <button onClick={dec}>Decrementar</button>
        </div>
    );
}