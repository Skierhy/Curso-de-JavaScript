// alert es una función que muestra un mensaje en una ventana emergente
alert("Hola Mundo");

// prompt es una función que muestra una ventana para que el usuario ingrese un dato
let nombre = prompt("¿Cuál es tu nombre?");
console.log(nombre);
// string vacío ''
console.log("****" + nombre + "****"); // ''

// confirm es una función que muestra una ventana para que el usuario confirme una acción
const select = confirm("¿Está seguro de borrar esto?");
console.log(select);

// global en node js es un objeto que contiene todas las variables globales del programa
// console.log( global );
