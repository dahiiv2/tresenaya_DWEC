//declaramos variables de por defecto
let turno = "x";
let celdaOcupada = null;
let victoriasX = 0;
let victoriasO = 0;

//listener para cuando se carga la página
window.addEventListener('load', () => {
    //listener para cuando se presione F5 que no recargue y llame a reset para hacer volver el tablero al principio
    window.addEventListener('keydown', (e) => {
        if (e.key === 'F5') {
            e.preventDefault();
            reset();
        }
    });

    comenzar();

    //Esta función comienza el juego haciendo que las piezas se puedan arrastrar y se pueda soltarlas en las cajas
    function comenzar() {
        //seleccionamos las piezas y cajas
        const piezasX = document.querySelectorAll("#piezasX img");
        const piezasO = document.querySelectorAll("#piezasO img");
        const boxes = document.querySelectorAll(".juegoPrincipal .box");

        //añadimos los listeners para arrastrar las piezas y los listeners para soltarlas en las cajas
        piezasX.forEach(pieza => pieza.addEventListener("dragstart", dragstart));
        piezasO.forEach(pieza => pieza.addEventListener("dragstart", dragstart));
        boxes.forEach(box => {
            box.addEventListener("dragenter", dragEnter);
            box.addEventListener("dragover", dragOver);
            box.addEventListener("drop", drop);
        });
    }

    //Esta función utiliza el DOM para reestablecer todas las piezas a su posición inicial despues de su ronda
    function reset() {
        //seleccionamos todas las cajas y piezas
        const boxes = document.querySelectorAll(".juegoPrincipal .box");
        const piezasXBoxes = document.querySelectorAll("#piezasX .box");
        const piezasOBoxes = document.querySelectorAll("#piezasO .box");
    
        //variables para en cada iteración saber en cual de las 3 cajas se colocan las piezas
        let xIndex = 0;
        let oIndex = 0;
    
        //iterar por cada caja
        boxes.forEach(box => {
            //quitamos la clase "ocupado"
            box.classList.remove("ocupado")
            while (box.firstChild) {
                //guardamos la pieza en una variable
                const piece = box.firstChild;
                //le asignamos draggable
                piece.setAttribute("draggable", "true");
    
                //si la pieza es x
                if (piece.classList.contains("x")) {
                    //la ponemos en las cajas de la x
                    piezasXBoxes[xIndex].appendChild(piece);
                    xIndex++;
                //si la pieza es o
                } else if (piece.classList.contains("o")) {
                    //la ponemos en las cajas de la o
                    piezasOBoxes[oIndex].appendChild(piece);
                    oIndex++;
                }
            }
        });
    
        //volvemos a poner el turno a x
        turno = "x";
        //actualizamos el turno
        actualizarTurnoVisual();
    
        //reasignamos los listeners
        boxes.forEach(box => {
            box.addEventListener("dragenter", dragEnter);
            box.addEventListener("dragover", dragOver);
            box.addEventListener("drop", drop);
        });
    }
    

    //Función que actualiza la imagen del turno
    function actualizarTurnoVisual() {
        //se selecciona la imagen del turno en el DOM
        const turnoDisplay = document.querySelector(".juegoPrincipal h1 img");
        //actualizamos la imagen del turno según el turno actual
        turnoDisplay.src = turno === "x" ? "img/x.jpg" : "img/o.jpg";
    }

    //Función que se llama al empezar un arrastramiento, para mover la pieza e asignar la caja como ocupada
    function dragstart(e) {
        //si es el turno correcto
        if ((turno === "x" && e.target.src.includes("x.jpg")) || (turno === "o" && e.target.src.includes("o.jpg"))) {
            //guardamos la info y la pasamos al target
            e.dataTransfer.setData("text/plain", e.target.id);
            //ponemos el target como celdaOcupada
            celdaOcupada = e.target.parentElement;
        } else {
            mostrarVentana("TURNO INCORRECTO");
            e.preventDefault();
        }
    }

    // Función para cuando el elemento entra en la caja
    function dragEnter(e) {
        e.preventDefault();
    }

    // Función para cuando el elemento se arrastra sobre la caja
    function dragOver(e) {
        e.preventDefault();
    }

    //Función que se llama al soltar un objeto arrastrado
    function drop(e) {
        e.preventDefault();
        //guardamos la celda donde la soltamos
        let celdaDrop = e.target;

        //mientras se arrastra en una caja, la guardamos
        while (!celdaDrop.classList.contains('box')) {
            celdaDrop = celdaDrop.parentElement;
        }

        //si la celda esta ocupada, mostramos ocupado y cortqmos la función
        if (celdaDrop.classList.contains("ocupado")) {
            mostrarVentana("CASILLA OCUPADA");
            return;
        }

        //guardmos el id del transfer del dragstart
        const id = e.dataTransfer.getData("text/plain");
        //guardamos si el id es draggable (arrastrable)
        const draggable = document.getElementById(id);

        //si es draggable, lo añadimos a la celda target y le añadimos la clase "ocupado"
        if (draggable) {
            celdaDrop.appendChild(draggable);
            celdaDrop.classList.add("ocupado");

            //si la celda esta ocupada y no es la misma
            if (celdaOcupada && celdaOcupada !== celdaDrop) {
                celdaOcupada.classList.remove("ocupado");
            }

            //comprobamos por si hay victoria
            comprobar();

            //cambiamos el turno y actualizamos la imagen de turno
            turno = (turno === "x") ? "o" : "x";
            actualizarTurnoVisual();
        }
        //asignamos celdaOcupada a null
        celdaOcupada = null;
    }

    //Esta función verifica el tres en raya, recibiendo como parámetro un array de la fila que vayamos a verificar
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
        return clasesHijos.length == 3 && clasesHijos.every(clase => clase === clasesHijos[0]);
    }

    //Esta función utiliza el método verificar para encontrar victorias en fila
    function fila() {
        return verificar([1, 4, 7]) || verificar([2, 5, 8]) || verificar([3, 6, 9]);
    }

    //Esta función utiliza el método verificar para encontrar victorias en columna
    function columna() {
        return verificar([1, 2, 3]) || verificar([4, 5, 6]) || verificar([7, 8, 9]);
    }

    //Esta función utiliza el método verificar para encontrar victorias en diagonal
    function diagonal() {
        return verificar([1, 5, 9]) || verificar([3, 5, 7]);
    }

    //Esta función comprueba si hay un ganador y actualiza los contadores de victorias
    function comprobar() {
        //si alguno de los metodos devuelven verdadero
        if (fila() || columna() || diagonal()) {
            //mostramos la ventana con el ganador y actualizamos los contadores de victorias
            mostrarVentana("GANADOR JUGADOR " + turno.toUpperCase());
            if (turno === "x") {
                victoriasX++;
                document.getElementById("victoriasX").innerText = victoriasX;
            } else {
                victoriasO++;
                document.getElementById("victoriasO").innerText = victoriasO;
            }
            stop();
        }
    }

    //Esta función se llama al ganar, para que quite los listeners de las cajas
    function stop() {
        const boxes = document.querySelectorAll(".juegoPrincipal .box");
        boxes.forEach(box => {
            box.removeEventListener("dragenter", dragEnter);
            box.removeEventListener("dragover", dragOver);
            box.removeEventListener("drop", drop);
        });
    }

    //Esta función se utiliza siempre que se quiera mostrar una ventana, recibiendo un mensaje como parametro
    function mostrarVentana(mensaje) {
        //creamos la ventana
        const ventana = window.open("", "_blank", "width=200 , height=100, top=50, left=50");
        //escribimos el mensaje en la ventana que se pasa por el parametro
        ventana.document.write(mensaje);
        //hacemos que se cierre en 1seg
        setTimeout(() => {
            ventana.close();
        }, 1000);
    }
});
