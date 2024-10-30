const divX = document.querySelector(".x");
const divO = document.querySelector(".o");

// Inicializamos el turno para que empiece con `.x`
let turno = "x";

divX.addEventListener("dragstart", dragstart);
divO.addEventListener("dragstart", dragstart);

function dragstart(e) {
    // Verificamos si es el turno del elemento que se está intentando arrastrar
    if (e.target.classList.contains(turno)) {
        e.dataTransfer.setData("text/plain", e.target.id);
    } else {
        alert("No es tu turno");
        e.preventDefault(); // Cancela el evento de arrastre si no es el turno correcto
    }
}

const boxes = document.querySelectorAll(".box");

boxes.forEach(box => {
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("dragleave", dragLeave);
    box.addEventListener("drop", drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');

    // Verifica si el contenedor (box) ya tiene un elemento dentro
    if (e.target.querySelector(".x, .o")) {
        alert("Ocupado");
        return; // Evita que se añada otro elemento
    }

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    e.target.appendChild(draggable);

    // Cambia el turno al otro jugador
    turno = (turno === "x") ? "o" : "x";
}

window.addEventListener('load', () => {
    window.addEventListener('keyup', (e) => {
        if (e.key == 'F5') {
            e.preventDefault();
            comenzar();
        }
    });
});

function comenzar(){
    turno = "x";
    actualizarVisualTurno();
    let victoriasX = document.getElementById('victoriasX');
    let victoriasO = document.getElementById('victorias0');

    victoriasX.innerHTML = 0;
    victoriasO.innerHTML = 0;

    boxes.innerHTML = "";
}

function comprobar() {
    if(fila()){

        ventana("GANADOR JUGADOR " + turno);
        

    } else if (columna()) {

        ventana("GANADOR JUGADOR " + turno);
        
    } else if (diagonal()) {

        ventana("GANADOR JUGADOR " + turno);
        
    }
}

function fila(){
    const fila1 = [1, 4, 7];

    // Seleccionar los elementos con los IDs especificados
    const elementosSeleccionados = fila1.map(id => document.getElementById(id));

    // Crear un array para almacenar las clases de los hijos
    const clasesHijos = [];

    // Iterar sobre los elementos seleccionados
    elementosSeleccionados.forEach(elemento => {
        // Verificar si el elemento existe y tiene hijos
        if (elemento && elemento.children.length > 0) {
            // Obtener todos los hijos del elemento actual
            const hijos = elemento.children;

            // Iterar sobre los hijos y almacenar sus clases
            for (let i = 0; i < hijos.length; i++) {
                // Agregar la clase del hijo al array
                clasesHijos.push(...hijos[i].classList);
            }
        }
    });

    if (clasesHijos.length > 0 && clasesHijos.every(clase => clase === clasesHijos[0])) {
        return true;
    } else {
        return false;
    }
    

    const fila2 = [2, 5, 8];
    const fila3 = [3, 6, 9];
}

function columna(){

}

function diagonal(){
    
}

function mostrarVentana(mensaje){
    ventana = window.open("", "_blank", "width=200 , height=100, top=50, left=50");
        ventana.document.write(mensaje);
        setTimeout(() => {
            ventana.close();
            comenzar();
        }, 3000);
}
