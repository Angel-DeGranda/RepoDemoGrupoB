
/*
const showMessage = () =>{
    setTimeout(()=>{
        console.log("Hello");
    }, 3000);
}

showMessage();

console.log("Nuevo mensaje");
*/

/* async function tarea() {
    return "asynchronous task";
}

async function ejecuta() {
    const respuesta = await tarea();
    console.log(respuesta);
}

ejecuta(); */

/* //promises
//Ejemplo de una promise
const promesa = new Promise(
    (resolve, reject)=>{
        const todobien=false;
        setTimeout(()=>{
            if(todobien){
                resolve("Todo está muy bien!");
            }else{
                reject("Todo mal");
            }
        }, 5000)
        
    }
);

promesa.then(
    (respuesta) => {console.log(respuesta);}
).catch(
    (errorMensage) => {console.log(errorMensage);}
); */

/* const promesaUno = new Promise(
    (resolve,reject) => {
        resolve("Promesa uno resuelta");
    }
);

const promesados = new Promise(
    (resolve,reject) => {
        resolve("Promesa dos resuelta");
    }
);

const promesatres = new Promise(
    (resolve,reject) => {
        reject("Promesa tres fallida");
    }
);

promesaUno.then(
    (res)=>{
        console.log(res);
        return promesados;
    }

).then(
    (res)=>{
        console.log(res);
        return promesatres;
    }
).catch(
    (e)=>{
        console.log(e);
    }
);

//Otra forma

promesaUno.then(
    (respuesta) => {
        console.log(respuesta);
        promesados.then(
            (resp) => {
                console.log(resp);
                promesatres.then(
                    (res) => {console.log(res);}
                ).catch(
                    (error) => {console.log(error);}
                );
            }
        );
    }
); */

async function fetchPokemon() {
    try{
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon');
        const datos = await respuesta.json();
        datos.results.forEach(pokemon => {
            fetchDetalles(pokemon.url)
        });
    }catch(error){
        console.log("Error para obtener los Pokémones");
    }
}

async function fetchDetalles(url){
    try {
        const detalles = await fetch(url);
        const pokemon = await detalles.json();
        crearCard(pokemon);
    } catch (error) {
        console.log("No se pudo obtener la info del pokémon");
    }
}
    
function crearCard(pokemon) {
    //hacer la tarjeta
        const contenedor = document.getElementById("pokemonContainer");
        const col = document.createElement("div");
        col.className = "col-md-4 col-lg-3";
        col.innerHTML= `
        <div class="card h-100 shadow-lg bg-secondary text-white">
            <img src="${pokemon.sprites.other['official-artwork'].front_shiny}" class="card-img-top p-3" alt="${pokemon.name}">
            <div class="card-body text-center">
                <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                <p class="card-text">
                    Tipo: ${pokemon.types.map(t => t.type.name).join(", ")}
                </p>
            </div>
        </div>
        `;
        
        contenedor.appendChild(col);
}
    

fetchPokemon();


