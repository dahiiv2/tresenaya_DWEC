window.addEventListener('load', () => {
    window.addEventListener('keydown', (e) => {
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
            mostrarVentana("TURNO INCORRECTO");
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
            comprobar();

            turno = (turno === "x") ? "o" : "x";

            actualizarTurnoVisual();
        }

        
    }

    function actualizarTurnoVisual() {
        const turnoDisplay = document.querySelector(".juegoPrincipal h1 img");
        turnoDisplay.src = turno === "x" ? "img/x.jpg" : "img/o.jpg";
    }

    function comenzar(){
        turno = "x";
        actualizarTurnoVisual();
        boxes.forEach(box => box.innerHTML = "");
        
        piezasX.forEach((pieza, index) => {
            const originalBox = document.getElementById(`i${index + 1}`);
            originalBox.appendChild(pieza);
        });
    
        piezasO.forEach((pieza, index) => {
            const originalBox = document.getElementById(`d${index + 1}`);
            originalBox.appendChild(pieza);
        });
    }

    let victoriasX = 0;
    let victoriasO = 0;

    function comprobar() {
        if(fila()){
            mostrarVentana("GANADOR JUGADOR " + turno.toUpperCase());
            if (turno === "x") {
                victoriasX++;
                document.getElementById("victoriasX").innerText = victoriasX;
            } else {
                victoriasO++;
                document.getElementById("victoriasO").innerText = victoriasO;
            }
        } else if (columna()) {
            mostrarVentana("GANADOR JUGADOR " + turno.toUpperCase());
            if (turno === "x") {
                victoriasX++;
                document.getElementById("victoriasX").innerText = victoriasX;
            } else {
                victoriasO++;
                document.getElementById("victoriasO").innerText = victoriasO;
            }
        } else if (diagonal()) {
            mostrarVentana("GANADOR JUGADOR " + turno.toUpperCase());
            if (turno === "x") {
                victoriasX++;
                document.getElementById("victoriasX").innerText = victoriasX;
            } else {
                victoriasO++;
                document.getElementById("victoriasO").innerText = victoriasO;
            }
        }
    }

    function fila(){
        const fila1 = [1, 4, 7];
        const fila2 = [2, 5, 8];
        const fila3 = [3, 6, 9];
    
        let resultado1 = verificar(fila1);
        let resultado2 = verificar(fila2);
        let resultado3 = verificar(fila3);
    
        if (resultado1 || resultado2 || resultado3) {
            return true;
        } else {
            return false;
        }
    }
    
    function columna(){
        const columna1 = [1, 2, 3];
        const columna2 = [4, 5, 6];
        const columna3 = [7, 8, 9];
    
        let resultado1 = verificar(columna1);
        let resultado2 = verificar(columna2);
        let resultado3 = verificar(columna3);
    
        if (resultado1 || resultado2 || resultado3) {
            return true;
        } else {
            return false;
        }
    }
    
    function diagonal(){
        const diagonal1 = [1, 5, 9];
        const diagonal2 = [3, 5, 7];
    
        let resultado1 = verificar(diagonal1);
        let resultado2 = verificar(diagonal2);
    
        if (resultado1 || resultado2) {
            return true;
        } else {
            return false;
        }
    }
    
    function mostrarVentana(mensaje){
        ventana = window.open("", "_blank", "width=200 , height=100, top=50, left=50");
            ventana.document.write(mensaje);
            setTimeout(() => {
                ventana.close();
            }, 3000);
    }
    
    function verificar(fila) {
        // Seleccionar los elementos con los IDs especificados
        const elementosSeleccionados = fila.map(id => document.getElementById(id));
    
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
    
        // Comprobar si todas las clases son iguales
        if (clasesHijos.length == 3 && clasesHijos.every(clase => clase === clasesHijos[0])) {
            return true;
        } else {
            return false;
        }
    }


});