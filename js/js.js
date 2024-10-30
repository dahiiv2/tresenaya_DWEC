window.addEventListener('load', () => {
    window.addEventListener('keyup', (e) => {
        if (e.key == 'F5') {
            e.preventDefault();
            comenzar();
        }
    });
});

function comenzar(){

}

function comprobar() {
    if(fila()){

        ventana("GANADOR JUGADOR " + jugador);
        

    } else if (columna()) {

        ventana("GANADOR JUGADOR " + jugador);
        
    } else if (diagonal()) {

        ventana("GANADOR JUGADOR " + jugador);
        
    }
}

function fila(){
    const fila1 = [1, 4, 7];
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