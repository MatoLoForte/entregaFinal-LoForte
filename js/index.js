let excursiones = [
    {
        id: "excursion-1",
        titulo: "Potrerillos (Dique)",
        imagen: "./assets/img/excursion potrerillos.jpg",
        precio: 5000,
    },
    {
        id: "excursion-2",
        titulo: "Potrerillos (Completo)",
        imagen: "./assets/img/excursion potrerillos completo.jpg",
        precio: 8000,  
    },
    {
        id: "excursion-3",
        titulo: "Villavicencio",
        imagen: "./assets/img/excursion villavicencio.jpg",
        precio: 8000,  
    },
    {
        id: "excursion-4",
        titulo: "Alta Montaña",
        imagen: "./assets/img/excursion puente del inca - cristo redentor.jpg",
        precio: 8000,  
    },
    {
        id: "excursion-5",
        titulo: "San Rafael",
        imagen: "./assets/img/valle grande.jpg",
        precio: 8000,  
    },
    {
        id: "excursion-6",
        titulo: "Bodegas",
        imagen: "./assets/img/bodegas.jpg",
        precio: 10000,  
    },
]

const contenedorExcursiones = document.querySelector("#contenedor-excursiones")
let botonesAgregarExcursion = document.querySelectorAll(".excursion-agregar")
const numerito = document.querySelector('#numerito')

function cargarExcursiones () {
    excursiones.forEach(excursion => {
        const div = document.createElement("div");
        div.classList.add("excursion");
        div.innerHTML = `
            <img class="imagenProducto excursion-imagen" src= "${excursion.imagen}" alt="${excursion.titulo}" />
                <div class="excursion-detalles">
                    <h2 class="excursion-titulo">${excursion.titulo}</h2>
                    <p class="excursion-precio">$${excursion.precio}(Arg)</p>
                    <button id="${excursion.id}" class="excursion-agregar">Agregar</button>
                </div>
        `;      
        contenedorExcursiones.append(div)
    })
    actualizarBotonesAgregar();
}
cargarExcursiones();


    function actualizarBotonesAgregar() {
    botonesAgregarExcursion = document.querySelectorAll(".excursion-agregar");

    botonesAgregarExcursion.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}
let excursionesEnCarrito;

let excursionesEnCarritoLS = localStorage.getItem("excursiones-en-carrito");

if(excursionesEnCarritoLS) {
    excursionesEnCarrito = JSON.parse(excursionesEnCarritoLS);
    actualizarNumerito();
} else {
    excursionesEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton =e.currentTarget.id;
    const excursionAgregada = excursiones.find(excursion => excursion.id === idBoton)
    if(excursionesEnCarrito.some(excursion => excursion.id === idBoton)) {
        const index = excursionesEnCarrito.findIndex(excursion => excursion.id === idBoton);
        excursionesEnCarrito[index].cantidad++;
    } else {
        excursionAgregada.cantidad = 1;
        excursionesEnCarrito.push(excursionAgregada);
    }
    actualizarNumerito();
    
   localStorage.setItem("excursiones-en-carrito", JSON.stringify(excursionesEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = excursionesEnCarrito.reduce((acc, excursion) => acc + excursion.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

const listaExcursionesProximas = document.querySelector("#lista-excursiones-proximas")

fetch("./js/nuevasExcursiones.json")
    .then(response => response.json())
    .then(data => {
        listaNuevas(data);
    })    

    function listaNuevas(excursiones) {
        excursiones.forEach(excursion => {
            const li = document.createElement("li");
            li.innerText = "*" + excursion.titulo + " (" + excursion.descripcion + ")";
            listaExcursionesProximas.append(li);
        });
    }