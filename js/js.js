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
