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

        ventana();
        

    } else if (columna()) {

        ventana();
        
    } else if (diagonal()) {

        ventana();
        
    }
}

function fila(){
    return true;
}

function columna(){
    
}

function diagonal(){
    
}

function ventana(){
    ventana = window.open("", "_blank", "width=200 , height=100, top=50, left=50");
        ventana.document.write("GANADOR JUGADOS: " + jugador);
        setTimeout(() => {
            ventana.close();
            comenzar();
        }, 3000);
}