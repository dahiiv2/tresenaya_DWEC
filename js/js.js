window.addEventListener('load', () => {
    window.addEventListener('keyup', (e) => {
        if (e.key == 'F5') {
            e.preventDefault();
            comenzar();
        }
    });

    let turno = "x";
    const piezasX = document.querySelectorAll("#piezasX img");
    const piezasO = document.querySelectorAll("#piezasO img");
    const boxes = document.querySelectorAll(".juegoPrincipal .box");

    piezasX.forEach(pieza => pieza.addEventListener("dragstart", dragstart));
    piezasO.forEach(pieza => pieza.addEventListener("dragstart", dragstart));

    function dragstart(e) {
        console.log("dragstart");
        if ((turno == "x" && e.target.src.includes("x.jpg")) || (turno == "o" && e.target.src.includes("o.jpg"))) {
            e.dataTransfer.setData("text/plain", e.target.id);
        } else {
            alert("No es tu turno");
            e.preventDefault();
        }
    }

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
        e.target.classList.remove('drag-over');
    }

    function drop(e) {
        e.preventDefault();
        e.target.classList.remove('drag-over');

        if (e.target.querySelector("img")) {
            alert("Ocupado");
            return;
        }

        const id = e.dataTransfer.getData("text/plain");
        const draggable = document.getElementById(id);

        if (draggable) {
            e.target.appendChild(draggable);

            turno = (turno === "x") ? "o" : "x";

            actualizarTurnoVisual();
        }

        // comprobar();
    }

    function actualizarTurnoVisual() {
        const turnoDisplay = document.querySelector(".juegoPrincipal h1 img");
        turnoDisplay.src = turno === "x" ? "img/x.jpg" : "img/o.jpg";
    }

    function comenzar(){
        turno = "x";
        actualizarTurnoVisual();
        let victoriasX = document.getElementById('victoriasX');
        let victoriasO = document.getElementById('victoriasO');

        victoriasX.innerHTML = 0;
        victoriasO.innerHTML = 0;

        boxes.forEach(box => box.innerHTML = "");
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
        const fila1 = [1, 2, 3];
        const fila2 = [4, 5, 6];
        const fila3 = [7, 8, 9];

        const filas = [fila1, fila2, fila3];

        for (let fila of filas) {
            const elementosSeleccionados = fila.map(id => document.getElementById(id));
            const clasesHijos = [];

            elementosSeleccionados.forEach(elemento => {
                if (elemento && elemento.children.length > 0) {
                    const hijo = elemento.children[0];
                    clasesHijos.push(hijo.className);
                }
            });

            if (clasesHijos.length === 3 && clasesHijos.every(clase => clase === clasesHijos[0])) {
                return true;
            }
        }
        return false;
    }

    function columna(){
        const columna1 = [1, 4, 7];
        const columna2 = [2, 5, 8];
        const columna3 = [3, 6, 9];

        const columnas = [columna1, columna2, columna3];

        for (let columna of columnas) {
            const elementosSeleccionados = columna.map(id => document.getElementById(id));
            const clasesHijos = [];

            elementosSeleccionados.forEach(elemento => {
                if (elemento && elemento.children.length > 0) {
                    const hijo = elemento.children[0];
                    clasesHijos.push(hijo.className);
                }
            });

            if (clasesHijos.length === 3 && clasesHijos.every(clase => clase === clasesHijos[0])) {
                return true;
            }
        }
        return false;
    }

    function diagonal(){
        const diagonal1 = [1, 5, 9];
        const diagonal2 = [3, 5, 7];

        const diagonales = [diagonal1, diagonal2];

        for (let diagonal of diagonales) {
            const elementosSeleccionados = diagonal.map(id => document.getElementById(id));
            const clasesHijos = [];

            elementosSeleccionados.forEach(elemento => {
                if (elemento && elemento.children.length > 0) {
                    const hijo = elemento.children[0];
                    clasesHijos.push(hijo.className);
                }
            });

            if (clasesHijos.length === 3 && clasesHijos.every(clase => clase === clasesHijos[0])) {
                return true;
            }
        }
        return false;
    }

    function mostrarVentana(mensaje){
        const ventana = window.open("", "_blank", "width=200 , height=100, top=50, left=50");
        ventana.document.write(mensaje);
        setTimeout(() => {
            ventana.close();
            comenzar();
        }, 3000);
    }
});
