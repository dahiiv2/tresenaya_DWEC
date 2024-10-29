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
        
    } else if (columna()) {
        
    } else if (diagonal()) {
        
    }
}

function fila(){
    return true;
}

function columna(){
    
}

function diagonal(){
    
}