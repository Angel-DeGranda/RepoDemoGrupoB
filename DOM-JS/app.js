/*
getElementById()
getElementsByClassName()
getElementsByTagName()
querySelector()
querySelectorAll()

//vinculamos el elemento html con un objeto en JS
const titulo = document.getElementById("titulo");
console.log(titulo.attributes);
console.log(typeof(titulo.tagName));

const container = document.getElementsByClassName("contenedor");
console.log(container);

const div_container = document.getElementsByTagName("li");
console.log(div_container[1]);

const contenedor = document.querySelector("#titulo"); //el primer element que encuentre con esa cosa que tiene como parametro.
console.log(contenedor);

const contenedor = document.querySelectorAll("ul li:not(.items-tipo1)");
console.log(contenedor);

//recuperar o vincular el elemento h1
const titulo = document.getElementById("titulo");
console.log(titulo.style);
titulo.style.backgroundColor = "red";
titulo.style.textTransform = "uppercase";

//Recuperar o vincular el elemento ul
const ul_node = document.getElementsByTagName("ul");
console.log(ul_node);
console.log(ul_node[0].innerText);
console.log(ul_node[0].textContent);
console.log(ul_node[0].innerHTML);

//Modificar contenido de un nodo
const titulo = document.getElementById("titulo");
titulo.innerText = "Listado de cafés";

//acceder y cambiar un atributo
const enlace = document.getElementsByTagName("a");
console.log(enlace[0].getAttribute("href"));
enlace[0].setAttribute("href", "https://geeksforgeeks.org");

//vinculamos el elemento HTML con un objeto en JS
const contenedor = document.getElementsByTagName("div");
console.log(contenedor[0].classList);
contenedor[0].classList.add("color_texto");

let res = contenedor[0].classList.contains("contenedor");
console.log(res);

contenedor[0].classList.remove("color_texto");

//agregar un nuevo elemento al documento
const listado = document.getElementsByClassName("listado");
const nuevoElemento = document.createElement("li");
nuevoElemento.innerText = "Item 6";
nuevoElemento.classList.add("items-tipo1");
listado[0].append(nuevoElemento);
nuevoElemento.remove();

*/


