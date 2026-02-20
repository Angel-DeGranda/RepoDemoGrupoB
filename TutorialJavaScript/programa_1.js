/*
//var //Que la variable tenga un ambito mas general
//let //ambito de bloque
//const //elementos que no cambian su valor en el tiempo de ejecución

var nombre;
nombre="Juan Lopez Jolote";


//let es solo para cuando esta dentro de un bloque:
{
    let nombre;
    nombre="Maria Jimenez";
    document.writeln(nombre)
}

{ //esto es para que veas que el let solo es en el bloque en el que se encuentra, si se usa el mismo fuera de ese bloque, no dentro o ahi mismo, entonces no pasa para ir en el bloque mayor al que esta.
    var nombre2="maria Liciada";
    {
        let nombre2="Juan Perez";
    }
    document.writeln(nombre2)
}

var myNombre="Hola";
console.log(typeof(myNombre));

//console.log("Hola Mundo");
//document.writeln("<h1>Hola Mundo</h1>");
*/

let c = 0, ci = 0, cd = 0;
const count = document.getElementById("count");
const incCount = document.getElementById("incCount");
const decCount = document.getElementById("decCount");
function inc() {
    c++;
    ci = (ci >= 10) ? 0 : ci + 1;
    update();
}
function dec() {
    c = c > 0 ? c - 1 : 0;
    cd = (cd >= 10) ? 0 : cd + 1;
    update();
}
function update() {
    count.textContent = c;
    incCount.textContent = ci;
    decCount.textContent = cd;
}